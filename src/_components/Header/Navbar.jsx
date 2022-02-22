import React, { Component, useState } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import config from 'config';

import { Nav, NavbarActions } from './';
import MenuIcon from '@material-ui/icons/Menu';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';


import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import {
    Container,
    IconButton,
    Switch,
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
import { stylesActions, userActions } from "../../_actions";


const Navbar = ({ history, dispatch, currentTheme, themes, user, search }) => {
    const [openMenu, setOpenMenu] = useState(false);
    const [theme, setThemeState] = useState(currentTheme === 'light' ? false : true);
    const toggleDrawer = (anchor, open) => {
        setOpenMenu(open);
    };

    const handleThemeChange = () => {
        if (currentTheme === 'light') {
            localStorage.setItem('theme', 'dark')
            setThemeState(true)
            const theme = { currentTheme: 'dark', themes: themes }
            dispatch(stylesActions.setTheme(theme))
            setTheme();
        } else {
            localStorage.setItem('theme', 'light')
            setThemeState(false)
            const theme = { currentTheme: 'light', themes: themes }
            dispatch(stylesActions.setTheme(theme))
            setTheme();
        }
    }

    const setTheme = () => {
        const theme = themes[currentTheme];
        Object.keys(theme).forEach((key) => {
            const cssKey = `--${key}`;
            const cssValue = theme[key];
            document.documentElement.style.setProperty(cssKey, cssValue)
        })
    }

    const logOut = () => {
        userActions.logout();
        history.push('/sign-in');
    }

    return (
        <Container>
            <div className="navbar">
                <div className="desktop-navbar">
                    <nav className="stroke">
                        <a href="/">
                            <img className="logo" height="50px" width="112.5px" src="https://kniga-knig.info/assets/img/logo.png" />
                        </a>

                        <ul>
                            <Nav link={'/'}>Главная</Nav>
                            {user === null ? (null) : (
                                (user.role_type === 'ROLE_ADMIN' || user.role_type === 'ROLE_SUPER_ADMIN') && <Nav link={'/admin-panel'}>{user.role_type === 'ROLE_ADMIN' ? "Администратор" : 'Cуперадмин'}</Nav>
                            )}
                            {user === null ? (null) : (
                                user.role_type === 'ROLE_TEATHER' && <Nav link={'/teather-panel'}>Панель учителя</Nav>
                            )}
                            {user === null ? (null) : (
                                user.role_type === 'ROLE_USER' && user.role_name === 'Промоутер' && <Nav link={'/promouter-panel'}>Панель промоутера</Nav>
                            )}
                            <Nav link={'/courses'}>Курсы</Nav>
                            <Nav link={'/contacts'}>Контакты</Nav>
                        </ul>


                    </nav>
                    <NavbarActions history={history} />
                </div>
                <div className="mobile-navbar">
                    <a href="/">
                        <img className="logo" height="50px" width="112.5px" src="https://kniga-knig.info/assets/img/logo.png" />
                    </a>
                    <IconButton className={"navbar-icon"} onClick={() => toggleDrawer('left', true)}>
                        <MenuIcon />
                    </IconButton>
                    <Drawer anchor={'left'} open={openMenu} onClose={() => toggleDrawer('left', false)}>
                        {user ? (
                            <Link to="/profile" onClick={() => toggleDrawer('left', false)} className="p-0">
                                <ListItem button>
                                    <ListItemFirstAction>
                                        <ListItemIcon>
                                            <Avatar alt="" src={user.avatar} />
                                        </ListItemIcon>
                                        <ListItemText title={user.lastname + " " + user.firstname} subtitle={`Статус: ${user.role_name}`} />
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
                        {user ? (
                            <ListItem>
                                <Button className='w-100' variant='outlined' onPress={() => { logOut(), toggleDrawer('left', false) }}>Выход</Button>
                            </ListItem>

                        ) : (
                            <ListItem>
                                <ListItemIcon>
                                    <Link to="/sign-in" onClick={() => toggleDrawer('left', false)}>
                                        <Button color="primary" variant="outlined">Вход</Button>
                                    </Link>
                                </ListItemIcon>
                                <ListItemText>
                                    <Link to="/sign-up" onClick={() => toggleDrawer('left', false)}>
                                        <Button color="primary" variant="outlined">Регистрация</Button>
                                    </Link>
                                </ListItemText>
                            </ListItem>


                        )}
                        <Divider />
                        <ListItem button onPress={() => {history.push('/dialogs'), toggleDrawer('left', false)} }>
                            <ListItemFirstAction>
                                <ListItemIcon>
                                    <ChatBubbleIcon />
                                </ListItemIcon>
                                <ListItemText title="Мои диалоги" />
                            </ListItemFirstAction>
                        </ListItem>
                        <ListItem>
                            <ListItemFirstAction>
                                <ListItemIcon><Brightness2Icon /></ListItemIcon>
                                <ListItemText title='Темная тема' />
                            </ListItemFirstAction>
                            <ListItemSecondAction>
                                <Switch isToggled={theme} onToggle={() => handleThemeChange()} />
                            </ListItemSecondAction>
                        </ListItem>

                        <Divider />
                        <ListItem onPress={() => { history.push('/'), toggleDrawer('left', false) }} button>
                            <ListItemFirstAction>
                                <ListItemText title="Главная" />
                            </ListItemFirstAction>
                        </ListItem>
                        {user === null ? (null) : (
                            (user.role_type === 'ROLE_ADMIN' || user.role_type === 'ROLE_SUPER_ADMIN') &&
                            <ListItem onPress={() => { history.push('/admin-panel'), toggleDrawer('left', false) }} button>
                                <ListItemFirstAction>
                                    <ListItemText title={user.role_type === 'ROLE_ADMIN' ? "Администратор" : 'Cуперадмин'} />
                                </ListItemFirstAction>
                            </ListItem>
                        )}
                        {user === null ? (null) : (
                            user.role_type === 'ROLE_TEATHER' &&
                            <ListItem onPress={() => { history.push('/teather-panel'), toggleDrawer('left', false) }} button>
                                <ListItemFirstAction>
                                    <ListItemText title="Панель учителя" />
                                </ListItemFirstAction>
                            </ListItem>
                        )}
                        {user === null ? (null) : (
                            user.role_type === 'user' && user.role_name === 'ПРОМОУТЕР' &&
                            <ListItem onPress={() => { history.push('/promouter-panel'), toggleDrawer('left', false) }} button>
                                <ListItemFirstAction>
                                    <ListItemText title="Панель промоутера" />
                                </ListItemFirstAction>
                            </ListItem>
                        )}
                        <ListItem onPress={() => { history.push('/courses'), toggleDrawer('left', false) }} button>
                            <ListItemFirstAction>
                                <ListItemText title="Курсы" />
                            </ListItemFirstAction>
                        </ListItem>
                        <ListItem onPress={() => { history.push('/contacts'), toggleDrawer('left', false) }} button>
                            <ListItemFirstAction>
                                <ListItemText title="Контакты" />
                            </ListItemFirstAction>
                        </ListItem>
                    </Drawer>
                </div>
            </div>
        </Container>
    );
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
const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar };
