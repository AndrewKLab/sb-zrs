import React, { Component } from "react";
import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';


import { Container } from '../../_components';
import { Nav, NavbarActions } from './'



class Navbar extends Component {

    render() {
        const { history } = this.props;
        return (
            <div>
                    <Container>
                        <div className="navbar">
                            <nav className="stroke">
                                <a href='/'><h3 className='text-light m-0'>ШБ ЗРС</h3></a>
                                <ul>
                                    <Nav link={'/'}>Главная</Nav>
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
    const { theme, classes } = state.style;
    const { user } = state.authentication
    return {
        theme,
        classes,
        user
    };
}
const connectedNavbar = connect(mapStateToProps)(Navbar);
export { connectedNavbar as Navbar }; 
