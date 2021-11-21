import { initializeApp } from 'firebase/app';
import { getToken, onMessage, getMessaging } from 'firebase/messaging';
import { Button, notification } from 'antd';

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


export const getTokenHelper = async (setTokenFound) => {
    try {
        const currentToken = await getToken(messaging, { vapidKey: 'BJ4idnM6Nn_C3pT6CItQC4yiMGwxGkpAarSywAJouKYzYwanedolLDcwmf79WpPkPYLG0e9ULr9aRhzA9QxxlSQ' });
        if (currentToken) {
            console.log('current token for client: ', currentToken);
            setTokenFound(true);
        } else {
            console.log('No registration token available. Request permission to generate one.');
            setTokenFound(false);
        }
    } catch (err) {
        console.log('An error occurred while retrieving token. ', err);
    }
}

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

onMessage(messaging, (payload) => {
    console.log(payload);
    openNotification(payload.notification.title, payload.notification.body)
});



// export const onMessageListener = () =>
//   new Promise((resolve) => {
//     console.log('payload')
//     onMessage(messaging, (payload) => {
//       console.log(payload);
//     });
// });