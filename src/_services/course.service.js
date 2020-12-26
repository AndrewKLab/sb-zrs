import config from 'config';

export const courseService = {
    getAllCoursesByCategoryName
};

function getAllCoursesByCategoryName(category_name) {
    return fetch(`${config.apiUrl}/course/read_all_courses_by_category_name.php?category_name=${category_name}`, config.headers).then(handleResponse);
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

