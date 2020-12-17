import React from 'react';
import { Router} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { history, store } from '../_helpers';
import { userActions } from '../_actions'


import { Container, Header, Footer } from '../_components';

import { MainRouter } from '../App';


class App extends React.Component {
    componentDidMount(){
        const { jwt, dispatch } = this.props;
        if(jwt){
            dispatch(userActions.validateToken(jwt));
        }
        
    }
    render() {
        return (
            <Router history={history}>
                <div>
                    <Header />
                    <Container>
                        <MainRouter />
                    </Container>
                    <Footer  />
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