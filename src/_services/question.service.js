import config from 'config';

export const questionService = {
    updateQuestion
};

function updateQuestion(jwt, question_id, question, question_type) {
    const formData = new FormData();

    formData.append('jwt', jwt);
    formData.append('question', question);
    formData.append('question_type', question_type);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        },
        body: formData
    };

    return fetch(`${config.apiUrl}/question/update.php?question_id=${question_id}`, requestOptions).then(handleResponse);
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

