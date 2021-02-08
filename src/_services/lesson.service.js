import config from 'config';

export const lessonService = {
    createLesson,
    deleteLesson,
    getAllLessonsByCourse,
    createLessonPassed,
    updateLessonPassed,
    deleteAllPassedLessonsByCourse
};

function createLesson(jwt, course_id, number, name, videolink, description, text) {
    const formData = new FormData();

    formData.append('jwt', jwt);
    formData.append('number', number);
    formData.append('name', name);
    formData.append('videolink', videolink);
    formData.append('description', description);
    formData.append('text', text);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
        },
        body: formData
    };

    return fetch(`${config.apiUrl}/lesson/create.php?course_id=${course_id}`, requestOptions).then(handleResponse);
}

function deleteLesson(jwt, lesson_id) {
    const formData  = new FormData();
  
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

    return fetch(`${config.apiUrl}/lesson/delete.php?lesson_id=${lesson_id}`, requestOptions).then(handleResponse);
}

function getAllLessonsByCourse(course_id, user_id, teather_id) {
    return fetch(`${config.apiUrl}/lesson/read_by_course.php?courses_id=${course_id}&user_id=${user_id}&teather_id=${teather_id}`, config.GET).then(handleResponse);
}

function createLessonPassed(course_id, lesson_id, user_id) {
    return fetch(`${config.apiUrl}/lessons_passed/create.php?course_id=${course_id}&lesson_id=${lesson_id}&user_id=${user_id}`, config.POST).then(handleResponse);
}

function updateLessonPassed(passed_id, assessment, finish_time) {
    return fetch(`${config.apiUrl}/lessons_passed/update.php?id=${passed_id}`,
        {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Accept-Encoding': 'gzip, deflate',
                'Accept-Language': 'ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3',
            },
            body: JSON.stringify({
                finish_time,
                status: "finished",
                assessment
            })
        }).then(handleResponse);
}

function deleteAllPassedLessonsByCourse(course_id, user_id) {
    return fetch(`${config.apiUrl}/lessons_passed/delete_all_by_course_passed.php?course_id=${course_id}&user_id=${user_id}`, config.POST).then(handleResponse);
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

