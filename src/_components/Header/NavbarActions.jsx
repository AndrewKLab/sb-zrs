import React, { Component, createRef } from "react";
import {
    Avatar,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import Brightness2Icon from '@material-ui/icons/Brightness2';
import HelpIcon from '@material-ui/icons/Help';
import SearchIcon from '@material-ui/icons/Search';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';

import { CustomThemeContext } from "../../_styles/theme/CustomThemeProvider"

import {
    Switch,
    IconButton,
    ListItem,
    ListItemFirstAction,
    ListItemSecondAction,
    ListItemIcon,
    ListItemText,
    Button,
    Divider
} from "../"

import { stylesActions, userActions } from "../../_actions";


class NavbarActions extends Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.anchorEl = createRef(null);
        this.state = {
            theme: this.props.currentTheme === 'light' ? false : true,
            isOpen: false,
        };
    }
    static contextType = CustomThemeContext;

    componentDidMount() {
        this.setTheme();
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    UNSAFE_componentWillUnmount() {
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
                var dropdowns = document.getElementsByClassName("dropdown-content");
                var i;
                for (i = 0; i < dropdowns.length; i++) {
                    var openDropdown = dropdowns[i];
                    if (openDropdown.classList.contains('show')) {
                        openDropdown.classList.remove('show');
                    }
                }
            }
        }
    }

    logOut() {
        userActions.logout();
        this.props.history.push('/sign-in');
    }



    render() {
        const { user } = this.props;
        if(user) {
            console.log(user)
        }
        return (
            <div className='navbar-actions'>
                <form role="search" className="search-input-root m-3">
                    <div><SearchIcon /></div>
                    <input type="search" className='search-input' placeholder="Поиск..." />
                </form>

                <IconButton>
                    <NotificationsIcon />
                </IconButton>

                <div className="dropdown" ref={this.wrapperRef}>
                    <IconButton
                        onClick={() => this.handleOpenDropdown()}
                        className="dropbtn"
                    >
                        <Avatar alt="" src="http://lifestudio-test.ru/img/unnamed.png" />
                    </IconButton>
                    <div id="myDropdown" className="dropdown-content">
                        {user ? (
                            <Link to="/profile" onClick={() => this.handleCloseDropdown()} className="p-0">
                                <ListItem>
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
                                            <Avatar alt="" src="http://lifestudio-test.ru/img/unnamed.png" />
                                        </ListItemIcon>
                                        <ListItemText title="Привет, посетитель!" />
                                    </ListItemFirstAction>
                                </ListItem>

                            )}

                        <Divider />

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
                                <Button className='w-100' variant='outlined' onPress={() => {this.logOut(); this.handleCloseDropdown()}}>Выход</Button>
                            </ListItem>

                        ) : (
                                <ListItem>
                                    <ListItemIcon>
                                        <Link to="/sign-in" onClick={() => this.handleCloseDropdown()}>
                                            <Button color="primary" variant="outlined">Вход</Button>
                                        </Link>
                                    </ListItemIcon>
                                    <ListItemText>
                                        <Link to="/sign-ip" onClick={() => this.handleCloseDropdown()}>
                                            <Button color="primary" variant="outlined">Регистрация</Button>
                                        </Link>
                                    </ListItemText>
                                </ListItem>


                            )}

                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const { currentTheme, themes } = state.style;
    const { user } = state.authentication
    return {
        currentTheme,
        themes,
        user
    };
}
const connectedNavbar = connect(mapStateToProps)(NavbarActions);
export { connectedNavbar as NavbarActions };

