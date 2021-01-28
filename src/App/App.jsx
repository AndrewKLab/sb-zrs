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
        const { jwt, dispatch, loading } = this.props;
        if (jwt) {
            dispatch(userActions.validateToken(jwt)).then(
                () => this.setState({ loading: false }),
            );
        }
        else {
            this.setState({ loading: false })
        }
    }
    render() {
        const { loading } = this.state;
        if (loading === true) {
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
    const { jwt, loading } = authentication
    return {
        loading,
        alert,
        jwt
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 