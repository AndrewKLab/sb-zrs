import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import config from 'config';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
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


const NavbarActions = ({ dispatch, history, themes, currentTheme, user, search }) => {
    const wrapperRef = useRef(null);
    const searchRef = useRef(null);
    const anchorEl = useRef(null);

    const [theme, setThemeState] = useState(currentTheme === 'light' ? false : true)
    const [isOpen, setIsOpen] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        setTheme()

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    })


    // componentDidUpdate(prevProps) {
    //     if (this.props.currentTheme !== prevProps.currentTheme) {
    //         this.setTheme();
    //     }

    // }

    const setTheme = () => {
        const theme = themes[currentTheme];
        Object.keys(theme).forEach((key) => {
            const cssKey = `--${key}`;
            const cssValue = theme[key];
            document.documentElement.style.setProperty(cssKey, cssValue)
        })
    }


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

    const handleOpenDropdown = () => { document.getElementById("myDropdown").classList.toggle("show"); }

    const handleCloseDropdown = () => { document.getElementById("myDropdown").classList.remove("show"); }

    const handleClickOutside = (event) => {
        if (wrapperRef && !wrapperRef.current.contains(event.target)) {
            if (!event.target.matches('.dropbtn')) {
                document.getElementById("myDropdown").classList.remove("show")
            }
        }
    }

    const logOut = () => {
        userActions.logout();
        history.push('/sign-in');
    }

    //Search
    const handleChange = (event) => {
        if (event.target.value === "") {
            handleClose()
        } else {
            handleOpen()
        }

        dispatch(searchActions.search(event.target.value))
    }


    const handleOpen = () => { setOpenSearch(true) }
    const handleClose = () => { setOpenSearch(false) }

    const goToPage = (page) => {
        history.push(page)
        handleCloseDropdown()
    }

    return (
        <div className='navbar-actions'>
            <form role="search" className="search-input-root m-3">
                <input type="search" className='search-input' placeholder="Поиск..." onChange={(event) => handleChange(event)} />
                <div><SearchIcon /></div>
            </form>
            {openSearch === true ?
                <Dropdown id={"search"} open={openSearch} onClose={() => handleClose()}>
                    {search.search && search.search.courses !== undefined || search.search && search.search.lessons !== undefined ? (
                        <div>
                            {search.search.courses !== null ? (
                                <div>
                                    <Typography variant='h5' component='h5'>Курсы:</Typography>
                                    <Divider />
                                    {search.search.courses.map((item, index) => (
                                        <Link to={`/courses/${item.category_name}/${item.id}`} key={index}>
                                            <ListItem button onPress={() => handleClose()} className='text-align-left p-3'>
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
                                            <ListItem button onPress={() => handleClose()} className='text-align-left p-3'>
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

            <IconButton className={"navbar-icon"}>
                <NotificationsIcon />
            </IconButton>

            <div className="dropdown" ref={wrapperRef}>
                <IconButton
                    onClick={() => handleOpenDropdown()}
                    className="dropbtn"
                >
                    <Avatar alt="" className="dropbtn-img" src={user ? user.avatar : `/assets/img/unnamed.png`} />
                </IconButton>
                <div id="myDropdown" className="dropdown-content">
                    {user ? (
                        <ListItem button onPress={() => goToPage('/profile')}>
                            <ListItemFirstAction>
                                <ListItemIcon>
                                    <Avatar alt="" src={user.avatar} />
                                </ListItemIcon>
                                <ListItemText title={user.lastname + " " + user.firstname} subtitle={`Статус: ${user.role_name}` } />
                            </ListItemFirstAction>
                        </ListItem>
                    ) : (
                        <ListItem>
                            <ListItemFirstAction>
                                <ListItemIcon>
                                    <Avatar alt="" src={`/assets/img/unnamed.png`} />
                                </ListItemIcon>
                                <ListItemText title="Привет, посетитель!" />
                            </ListItemFirstAction>
                        </ListItem>

                    )}

                    <Divider className={'mt-0'} />

                    <ListItem button onPress={() => goToPage('/dialogs')}>
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

                    {/* 

                        <ListItem >
                            <ListItemFirstAction>
                                <ListItemIcon>
                                    <HelpIcon />
                                </ListItemIcon>
                                <ListItemText title="Справка" />
                            </ListItemFirstAction>
                        </ListItem> */}

                    <Divider />
                    {user ? (
                        <ListItem>
                            <Button className='w-100' variant='outlined' onPress={() => { logOut(); handleCloseDropdown() }}>Выход</Button>
                        </ListItem>

                    ) : (
                        <ListItem>
                            <ListItemIcon>
                                <Link to="/sign-in" onClick={() => handleCloseDropdown()}>
                                    <Button color="primary" variant="outlined">Вход</Button>
                                </Link>
                            </ListItemIcon>
                            <ListItemText>
                                <Link to="/sign-up" onClick={() => handleCloseDropdown()}>
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

