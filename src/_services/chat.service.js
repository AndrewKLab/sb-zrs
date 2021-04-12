import config from 'config';

export const chatService = {
    getAllChatsByUser
};

function getAllChatsByUser(jwt) {
    var requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    };

    return fetch(`/api/chat/read_all_chats_by_user.php`, requestOptions).then(handleResponse);
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

