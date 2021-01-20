import React, { Component } from "react";
import { connect } from 'react-redux';

import { Container, Loading } from '../';
import { Nav, NavbarActions } from './'



class Navbar extends Component {
    render() {
        const { history, user } = this.props;
        return (
            <div>
                <Container>
                    <div className="navbar">
                        <nav className="stroke">
                            <a href='/'><h3 className='text-light m-0'>ШБ ЗРС</h3></a>
                            <ul>
                                <Nav link={'/'}>Главная</Nav>
                                {user === undefined ? (null) : (
                                    user.roles === 'ROLE_ADMIN' && <Nav link={'/administrator'}>Администратор</Nav>
                                )}
                                {user === undefined ? (null) : (
                                    user.roles === 'ROLE_TEATHER' && <Nav link={'/teather-panel'}>Панель учителя</Nav>
                                )}
                                <Nav link={'/courses'}>Курсы</Nav>
                                <Nav link={'/contacts'}>Контакты</Nav>
                            </ul>
                        </nav>
                        <NavbarActions history={history} />
                    </div>
                </Container>
            </div>

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
