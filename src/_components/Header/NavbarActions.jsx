import React, { Component, createRef } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import config from 'config';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

import {
    Switch,
    IconButton,
    ListItem,
    ListItemFirstAction,
    ListItemSecondAction,
    ListItemIcon,
    ListItemText,
    ListItemTitle,
    ListItemSubtitle,
    Button,
    Divider,
    Avatar,
    Typography,
    Dropdown
} from "../"

import { stylesActions, userActions, searchActions } from "../../_actions";


class NavbarActions extends Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.searchRef = React.createRef()
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.anchorEl = createRef(null);
        this.state = {
            theme: this.props.currentTheme === 'light' ? false : true,
            isOpen: false,
            openSearch: false
        };
    }

    componentDidMount() {
        this.setTheme();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentTheme !== prevProps.currentTheme) {
            this.setTheme();
        }

    }



    setTheme = () => {
        const { currentTheme, themes } = this.props;
        const theme = themes[currentTheme];
        Object.keys(theme).forEach((key) => {
            const cssKey = `--${key}`;
            const cssValue = theme[key];
            document.documentElement.style.setProperty(cssKey, cssValue)
        })
    }


    handleThemeChange() {
        const { currentTheme, themes } = this.props;
        if (currentTheme === 'light') {
            localStorage.setItem('theme', 'dark')
            this.setState({ theme: true })
            const theme = { currentTheme: 'dark', themes: themes }
            this.props.dispatch(stylesActions.setTheme(theme))
            this.setTheme();
        } else {
            localStorage.setItem('theme', 'light')
            this.setState({ theme: false })
            const theme = { currentTheme: 'light', themes: themes }
            this.props.dispatch(stylesActions.setTheme(theme))
            this.setTheme();
        }
    }

    handleOpenDropdown() {
        document.getElementById("myDropdown").classList.toggle("show");
    }

    handleCloseDropdown() {
        document.getElementById("myDropdown").classList.remove("show");
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            if (!event.target.matches('.dropbtn')) {
                document.getElementById("myDropdown").classList.remove("show")
            }
        }
    }

    logOut() {
        userActions.logout();
        this.props.history.push('/sign-in');
    }

    //Search
    handleChange(event) {
        const { dispatch } = this.props;
        if (event.target.value === "") {
            this.handleClose()
        } else {
            this.handleOpen()
        }

        dispatch(searchActions.search(event.target.value))
    }


    handleOpen() { this.setState({ openSearch: true }) }

    handleClose() { this.setState({ openSearch: false }) }

    render() {
        const { user, search } = this.props;
        const { openSearch } = this.state;
        return (
            <div className='navbar-actions'>
                <form role="search" className="search-input-root m-3">
                    <div><SearchIcon /></div>
                    <input type="search" className='search-input' placeholder="Поиск..." onChange={(event) => this.handleChange(event)} />
                </form>
                {openSearch === true ?
                    <Dropdown id={"search"} open={openSearch} onClose={() => this.handleClose()}>
                        {search.search && search.search.courses !== undefined || search.search && search.search.lessons !== undefined ? (
                            <div>
                                {search.search.courses !== null ? (
                                    <div>
                                        <Typography variant='h5' component='h5'>Курсы:</Typography>
                                        <Divider />
                                        {search.search.courses.map((item, index) => (
                                            <Link to={`/courses/${item.category_name}/${item.id}`} key={index}>
                                                <ListItem button onPress={() => this.handleClose()} className='text-align-left p-3'>
                                                    <ListItemFirstAction>
                                                        <ListItemText>
                                                            <ListItemTitle>
                                                                {item.name}
                                                            </ListItemTitle>
                                                            <ListItemSubtitle>
                                                                {item.description.length > 70 ? item.description.substr(0, 80 - 1) + '...' : item.description}
                                                            </ListItemSubtitle>
                                                        </ListItemText>
                                                    </ListItemFirstAction>
                                                </ListItem>
                                            </Link>
                                        ))}
                                    </div>
                                ) : null}
                                {search.search.lessons !== null ? (
                                    <div>
                                        <Typography variant='h5' component='h5'>Уроки:</Typography>
                                        <Divider />

                                        {search.search.lessons.map((item, index) => (
                                            <Link to={`/courses/${item.category_name}/${item.courses_id}/${item.id}`} key={index}>
                                                <ListItem button onPress={() => this.handleClose()} className='text-align-left p-3'>
                                                    <ListItemFirstAction>
                                                        <ListItemText>
                                                            <ListItemTitle>
                                                                {item.name}
                                                            </ListItemTitle>
                                                            <ListItemSubtitle>
                                                                {item.description.length > 70 ? item.description.substr(0, 80 - 1) + '...' : item.description}
                                                            </ListItemSubtitle>
                                                        </ListItemText>
                                                    </ListItemFirstAction>
                                                </ListItem>
                                            </Link>
                                        ))}

                                    </div>
                                ) : null}
                            </div>
                        ) : (
                                <Typography>{search.search}</Typography>
                            )}
                    </Dropdown>

                    : null}

                <IconButton className='text-light'>
                    <NotificationsIcon />
                </IconButton>

                <div className="dropdown" ref={this.wrapperRef}>
                    <IconButton
                        onClick={() => this.handleOpenDropdown()}
                        className="dropbtn"
                    >
                        <Avatar alt="" src={`${config.url}/assets/img/unnamed.png`} />
                    </IconButton>
                    <div id="myDropdown" className="dropdown-content">
                        {user ? (
                            <Link to="/profile" onClick={() => this.handleCloseDropdown()} className="p-0">
                                <ListItem button>
                                    <ListItemFirstAction>
                                        <ListItemIcon>
                                            <Avatar alt="" src={user.avatar} />
                                        </ListItemIcon>
                                        <ListItemText title={user.lastname + " " + user.firstname} subtitle={"Статус: " + user.status} />
                                    </ListItemFirstAction>
                                </ListItem>
                            </Link>
                        ) : (
                                <ListItem>
                                    <ListItemFirstAction>
                                        <ListItemIcon>
                                            <Avatar alt="" src={`${config.url}/assets/img/unnamed.png`} />
                                        </ListItemIcon>
                                        <ListItemText title="Привет, посетитель!" />
                                    </ListItemFirstAction>
                                </ListItem>

                            )}

                        <Divider className={'mt-0'} />

                        <ListItem>
                            <ListItemFirstAction>
                                <ListItemIcon><Brightness2Icon /></ListItemIcon>
                                <ListItemText title='Темная тема' />
                            </ListItemFirstAction>
                            <ListItemSecondAction>
                                <Switch isToggled={this.state.theme} onToggle={() => this.handleThemeChange()} />
                            </ListItemSecondAction>
                        </ListItem>

                        <ListItem>
                            <ListItemFirstAction>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText title="Настройки" />
                            </ListItemFirstAction>

                        </ListItem>

                        <ListItem >
                            <ListItemFirstAction>
                                <ListItemIcon>
                                    <HelpIcon />
                                </ListItemIcon>
                                <ListItemText title="Справка" />
                            </ListItemFirstAction>
                        </ListItem>

                        <Divider />
                        {user ? (
                            <ListItem>
                                <Button className='w-100' variant='outlined' onPress={() => { this.logOut(); this.handleCloseDropdown() }}>Выход</Button>
                            </ListItem>

                        ) : (
                                <ListItem>
                                    <ListItemIcon>
                                        <Link to="/sign-in" onClick={() => this.handleCloseDropdown()}>
                                            <Button color="primary" variant="outlined">Вход</Button>
                                        </Link>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Link to="/sign-up" onClick={() => this.handleCloseDropdown()}>
                                            <Button color="primary" variant="outlined">Регистрация</Button>
                                        </Link>
                                    </ListItemText>
                                </ListItem>


                            )}

                    </div>
                </div>
            </div >
        );
    }
}
function mapStateToProps(state) {
    const { currentTheme, themes } = state.style;
    const { user } = state.authentication
    const { search } = state
    return {
        currentTheme,
        themes,
        user,
        search
    };
}
const connectedNavbar = connect(mapStateToProps)(NavbarActions);
export { connectedNavbar as NavbarActions };

