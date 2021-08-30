import React, { Component } from "react";
import { connect } from 'react-redux';

import { Container, Loading } from '../';
import { Nav, NavbarActions } from './'



class Navbar extends Component {
    render() {
        const { history, user } = this.props;
        return (
                <Container>
                    <div className="navbar">
                        <nav className="stroke">
                            <a href="/">
                                <img className="logo" height="50px" width="112.5px" src="https://kniga-knig.info/assets/img/logo.png"/>
                            </a>
                            <ul>
                                <Nav link={'/'}>Главная</Nav>
                                {user === undefined ? (null) : (
                                    (user.roles === 'ROLE_ADMIN' || user.roles === 'ROLE_SUPER_ADMIN') && <Nav link={'/admin-panel'}>Администратор</Nav>
                                )}
                                {user === undefined ? (null) : (
                                    user.roles === 'ROLE_TEATHER' && <Nav link={'/teather-panel'}>Панель учителя</Nav>
                                )}
                                {user === undefined ? (null) : (
                                    user.roles === 'user' && user.status === 'ПРОМОУТЕР' && <Nav link={'/promouter-panel'}>Панель промоутера</Nav>
                                )}
                                <Nav link={'/courses'}>Курсы</Nav>
                                <Nav link={'/contacts'}>Контакты</Nav>
                            </ul>
                        </nav>
                        <NavbarActions history={history} />
                    </div>
                </Container>
        );
    }
}

function mapStateToProps(state) {
    const { user } = state.authentication
    return {
        user
    };
}
const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar }; 
