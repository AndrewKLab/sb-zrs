import config from 'config';

export const courseService = {
    createCourse,
    updateCourse,
    deleteCourse,
    getAllCoursesByCategoryName,
    getAllCoursesByAutor,
    createCoursePassed,
    updateCoursePassed,
    deleteCoursePassed,
    getAllPassedCourseByUser
};

function createCourse(jwt, name, autor_id, category_name, img, description) {
    const formData = new FormData();

    formData.append('jwt', jwt);
    formData.append('name', name);
    formData.append('autor_id', autor_id);
    formData.append('category_name', category_name);
    formData.append('img', img);
    formData.append('description', description);

    const requestOptions = {
        method: 'POST',
        body: formData
    };

    return fetch(`${config.apiUrl}/course/create.php`, requestOptions).then(handleResponse);
}

function updateCourse(jwt, course_id, name, autor_id, category_name, img, description, published) {
    const formData = new FormData();

    formData.append('jwt', jwt);
    formData.append('name', name);
    formData.append('autor_id', autor_id);
    formData.append('category_name', category_name);
    formData.append('img', img);
    formData.append('description', description);
    formData.append('published', published);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        },
        body: formData
    };

    return fetch(`${config.apiUrl}/course/update.php?course_id=${course_id}`, requestOptions).then(handleResponse);
}

function deleteCourse(jwt, course_id) {
    const formData = new FormData();

    formData.append('jwt', jwt);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        },
        body: formData
    };

    return fetch(`${config.apiUrl}/course/delete.php?course_id=${course_id}`, requestOptions).then(handleResponse);
}


function getAllCoursesByCategoryName(category_name) {
    return fetch(`${config.apiUrl}/course/read_all_courses_by_category_name.php?category_name=${category_name}`, config.GET).then(handleResponse);
}

function getAllCoursesByAutor(autor_id) {
    return fetch(`${config.apiUrl}/course/read_all_courses_by_autor.php?user_id=${autor_id}`, config.GET).then(handleResponse);
}

//passed_courses

function createCoursePassed(course_id, user_id) {
    return fetch(`${config.apiUrl}/courses_passed/create.php?course_id=${course_id}&user_id=${user_id}`, config.POST).then(handleResponse);
}

function updateCoursePassed(passed_course_id, status, assessment, start_time, finish_time) {
    return fetch(`${config.apiUrl}/courses_passed/update.php?id=${passed_course_id}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            },
            body: JSON.stringify({
                status,
                assessment,
                start_time,
                finish_time,
            })
        })
        .then(handleResponse);
}


function deleteCoursePassed(passed_course_id) {
    return fetch(`${config.apiUrl}/courses_passed/delete.php?id=${passed_course_id}`, config.POST).then(handleResponse);
}

function getAllPassedCourseByUser(user_id) {
    return fetch(`${config.apiUrl}/courses_passed/read_all_courses_passed_by_user.php?user_id=${user_id}`, config.GET).then(handleResponse);
}


function handleResponse(response) {
    return response.text().then(text => {

        const data = text && JSON.parse(text);

        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

