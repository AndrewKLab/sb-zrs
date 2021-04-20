import config from 'config';

export const chatService = {
    getAllChatsByUser,
    getMessagesByChat,
    sendMessage,
    checkNewMessagesByChat
};

function getAllChatsByUser(jwt) {
    var requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    };

    return fetch(`/api/chat/read_all_chats_by_user.php`, requestOptions).then(handleResponse);
}

function getMessagesByChat(jwt, chat_id, offset) {
    var requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    };

    return fetch(`/api/message/read_messages_by_chat.php?c=${chat_id}&o=${offset}`, requestOptions).then(handleResponse);
}

function sendMessage(jwt, to, message) {
    var requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify({ message })
    };

    return fetch(`/api/message/send.php?to=${to}`, requestOptions).then(handleResponse);
}

function checkNewMessagesByChat(jwt, chat_id, send_from) {
    var requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    };

    return fetch(`/api/message/check_new_messages_by_chat.php?c=${chat_id}&sf=${send_from}`, requestOptions).then(handleResponse);
}



function handleResponse(response) {
    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

