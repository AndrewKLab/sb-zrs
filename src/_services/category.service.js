import config from 'config';

export const categoryService = {
    getAllCategories
};

function getAllCategories() {
    return fetch(`${config.apiUrl}/course/read.php`, config.GET).then(handleResponse);
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

