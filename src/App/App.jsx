import React, { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTokenHelper, history } from '../_helpers';
import { userActions } from '../_actions'

import { Header, Footer, Loading } from '../_components';

import { MainRouter } from '../App';

const App = ({ jwt, dispatch, loading }) => {
    const [loadings, setLoading] = useState(true)


    useEffect(() => {
        const init = async () => {
            await getTokenHelper()
            await dispatch(userActions.validateToken(jwt)).then(() => { setLoading(false) })
        } 
        init();
        
    }, [])

    if (loadings === true || loading === true) return <Loading />

    return (

        <Router history={history}>
            <div>
                <Header history={history} />
                <div className='content container-content'>
                    <MainRouter />
                </div>
                <Footer />
            </div>
        </Router>
    );
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