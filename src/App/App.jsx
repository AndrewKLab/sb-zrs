import React from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { userActions, categoryActions } from '../_actions'


import { Container, Header, Footer, Loading } from '../_components';

import { MainRouter } from '../App';


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
        }
    }

    componentDidMount() {
        const { jwt, dispatch } = this.props;
        if (jwt) {
            dispatch(userActions.validateToken(jwt));
            this.setState({loading: false})
        } else {
            this.setState({loading: false})
        }
    }
    render() {
        const { loading } = this.state;
        var content;
        if (loading) {
            return <Loading />
        } 
        return (
            <Router history={history}>
                <div>
                    <Header history={history} />
                    <Container className='content'>
                        <MainRouter />
                    </Container>
                    <Footer />
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    const { jwt } = state.authentication
    return {
        alert,
        jwt
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 