import React, { Component, createRef } from "react";
import {
    Divider,
    Paper,
    Avatar,
    ListItemSecondaryAction,
    ClickAwayListener,
    MenuList,
    Popper,
    Grow,
    Button,
} from "@material-ui/core";

import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


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
    ListItemText
} from "../"

import { stylesActions } from "../../_actions";


class NavbarActions extends Component {

    constructor(props) {
        super(props);
        this.wrapperRef = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleThemeChange = this.handleThemeChange.bind(this);
        this.anchorEl = createRef(null);
        this.logOut = this.logOut.bind(this);
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
        AuthService.logout();
    }



    render() {
        const { classes, user } = this.props;
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
                            <Link to="/profile" onClick={this.handleClose}>
                                <ListItem>
                                    <ListItemIcon>
                                        <Avatar alt="" src={user.avatar} />
                                    </ListItemIcon>
                                    <ListItemText primary={user.lastname + " " + user.firstname} secondary={"Статус: " + user.status} />
                                </ListItem>
                            </Link>
                        ) : (
                                <ListItem>
                                    <ListItemIcon>
                                        <Avatar alt="" src="http://lifestudio-test.ru/img/unnamed.png" />
                                    </ListItemIcon>
                                    <ListItemText primary="Привет, посетитель!" />
                                </ListItem>
                            )}

                        <Divider />

                        <ListItem>
                            <ListItemFirstAction>
                                <ListItemIcon><Brightness2Icon /></ListItemIcon>
                                <ListItemText title='Темная тема' />
                            </ListItemFirstAction>
                            <ListItemSecondAction>
                                <Switch switched={this.state.switch} onColor="#EF476F" handleToggle={() => { this.handleToggleChange() }} />
                            </ListItemSecondAction>
                        </ListItem>


                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Настройки" />
                        </ListItem>

                        <ListItem button>
                            <ListItemIcon>
                                <HelpIcon />
                            </ListItemIcon>
                            <ListItemText primary="Справка" />
                        </ListItem>

                        <Divider />

                        <ListItem>
                            <Button color="primary" href="/login" onClick={this.logOut} variant="outlined" style={{ width: "100%" }}>Выход</Button>
                        </ListItem>

                    </div>
                </div>

                {user ? (
                    <Popper open={this.state.isOpen} anchorEl={this.anchorEl.current} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >

                            </Grow>
                        )}
                    </Popper>
                ) : (
                        <Popper open={this.state.isOpen} anchorEl={this.anchorEl.current} transition disablePortal>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="menu-list-grow"
                                    style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={this.handleClose}>
                                            <MenuList>

                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Avatar alt="" src="http://lifestudio-test.ru/img/unnamed.png" className={classes.avatar} />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Привет, посетитель!" />
                                                </ListItem>



                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Link to="/login" onClick={this.handleClose}>
                                                            <Button color="primary" variant="outlined">Вход</Button>
                                                        </Link>
                                                    </ListItemIcon>
                                                    <ListItemText inset >
                                                        <Link to="/register" onClick={this.handleClose}>
                                                            <Button color="primary" variant="outlined">Регистрация</Button>
                                                        </Link>
                                                    </ListItemText>
                                                </ListItem>

                                                <Divider />

                                                <ListItem>
                                                    <ListItemIcon>
                                                        <Brightness2Icon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Темная тема" />
                                                    <ListItemSecondaryAction style={{ display: "flex" }}>
                                                        <Switch isOn={this.state.theme} onColor="#EF476F" handleToggle={this.handleThemeChange} />
                                                    </ListItemSecondaryAction>
                                                </ListItem>

                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <SettingsIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Настройки" />
                                                </ListItem>

                                                <ListItem button>
                                                    <ListItemIcon>
                                                        <HelpIcon />
                                                    </ListItemIcon>
                                                    <ListItemText primary="Справка" />
                                                </ListItem>

                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    )}
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

