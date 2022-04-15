import React, { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { getDeviceInfo, getTokenHelper, history } from '../_helpers';
import { userActions } from '../_actions'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'

import { Header, Footer, Loading } from '../_components';

import { MainRouter } from '../App';

if (library.add) library.add(fab, fas)

const App = ({ jwt, dispatch, validate_token_loading, isLogined }) => {
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const init = async () => {
            await getTokenHelper(dispatch);
            const deviceInfo = await getDeviceInfo();
            const checkAuth = await dispatch(userActions.checkAuth(deviceInfo))
            if (checkAuth.isLogined) await dispatch(userActions.validateToken(checkAuth.token))
            setLoading(false)
        }
        init();
    }, [])

    if (loading === true || validate_token_loading === true) return <Loading />

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
    const { jwt, validate_token_loading, isLogined } = state.authentication
    return {
        isLogined,
        jwt,
        validate_token_loading,
        
    };
}
const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App };