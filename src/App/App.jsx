import React, { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import { connect } from 'react-redux';
import { getTokenHelper, onMessageListener, history } from '../_helpers';
import { userActions, categoryActions } from '../_actions'
import { Button, notification } from 'antd';

import { Container, Header, Footer, Loading, Typography, Notification } from '../_components';

import { MainRouter } from '../App';
import { getMessaging, onMessage } from "firebase/messaging";


const openNotification = (message, description) => {
    const key = `open${Date.now()}`;
    notification.open({
        message,
        description,
        key,
        onClick: () => console.log('click'),
        placement: 'bottomLeft'
    });
};



const App = ({ jwt, dispatch, loading }) => {
    const [loadings, setLoading] = useState(true)
    const [showNotificalion, setShowNotificalion] = React.useState(false);
    const [notification, setNotification] = useState({ title: '', body: '' });
    const [isTokenFound, setTokenFound] = useState(false);

    const initialization = async () => {
        try {
            await getTokenHelper(setTokenFound)
            await onMessageListener().then(payload => {
                //setShow(true);
                setShowNotificalion(true)
                openNotification(payload.notification.title, payload.notification.body)
                console.log(payload);
            }).catch(err => console.log('failed: ', err));
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    initialization();

    useEffect(() => {
        dispatch(userActions.validateToken(jwt)).then(() => { setLoading(false) })
    }, [])


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setShowNotificalion(false);
    };



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