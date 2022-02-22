import { initializeApp } from 'firebase/app';
import { getToken, onMessage, getMessaging } from 'firebase/messaging';
import { Button, notification } from 'antd';
import { chatActions } from '../_actions';

const firebaseApp = initializeApp({
    apiKey: "AIzaSyA36-3U3YsTwG6IRc72Ozq5mfrFp4U2OLo",
    authDomain: "kniga-knig.firebaseapp.com",
    projectId: "kniga-knig",
    storageBucket: "kniga-knig.appspot.com",
    messagingSenderId: "939497128330",
    appId: "1:939497128330:web:57a893dd141d4287560873",
    measurementId: "G-R8EQC1KGRY"
});

const messaging = getMessaging(firebaseApp);


export const getTokenHelper = async (dispatch) => {

    try {
        const currentToken = await getToken(messaging, { vapidKey: 'BJ4idnM6Nn_C3pT6CItQC4yiMGwxGkpAarSywAJouKYzYwanedolLDcwmf79WpPkPYLG0e9ULr9aRhzA9QxxlSQ' });
        if (currentToken) {
            //console.log(currentToken)
            localStorage.setItem('FBCtoken', currentToken);
            onMessage(messaging, (payload) => {
                console.log(payload);
                openNotification(payload, dispatch)
            });
            
        } else {
            console.log('No registration token available. Request permission to generate one.');
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
}

const openNotification = (payload, dispatch) => {
    const key = `open${Date.now()}`;
    const { title, body } = payload.notification;
    const { chat_id, created, message, message_id, read_status, send_from, send_to } = payload.data;
    const message_data = {
        chat_id,
        created,
        message,
        message_id,
        read_status,
        send_from,
        send_to,
    }
    notification.open({
        message: title,
        description: body,
        key,
        onClick: () => console.log('click'),
        placement: 'bottomLeft'
    });
    
    dispatch(chatActions.getNewMessage(chat_id, message_data))
};




// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     console.log('payload')
//     onMessage(messaging, (payload) => {
//       console.log(payload);
//     });
// });