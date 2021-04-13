export const messageService = {
    getMessagesByChat
};

function getMessagesByChat(jwt, chat_id, offset) {
    var requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    };

    return fetch(`/api/message/read_messages_by_chat.php?c=${chat_id}&o=${offset}`, requestOptions).then(handleResponse);
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

