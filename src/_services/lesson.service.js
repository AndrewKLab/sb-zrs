import config from 'config';

export const lessonService = {
    //lessons
    createLesson,
    updateLesson,
    deleteLesson,
    getAllLessonsByCourse,

    //lessons_passed
    createLessonPassed,
    updateLessonPassed,
    deleteAllPassedLessonsByCourse
};

//создать урок
function createLesson(jwt, course_id, number, name, videolink, description, text, questions) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jwt,
            number,
            name,
            videolink,
            description,
            text,
            questions
        })
    };

    return fetch(`${config.apiUrl}/lesson/create.php?course_id=${course_id}`, requestOptions).then(handleResponse);
}

//обновить урок
function updateLesson(jwt, lesson_id, number, name, courses_id, videolink, description, text, questions) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            jwt,
            number,
            name,
            courses_id,
            videolink,
            description,
            text,
            questions
        })
    };

    return fetch(`${config.apiUrl}/lesson/update.php?lesson_id=${lesson_id}`, requestOptions).then(handleResponse);
}

//удалить урок
function deleteLesson(jwt, lesson_id) {
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

    return fetch(`${config.apiUrl}/lesson/delete.php?lesson_id=${lesson_id}`, requestOptions).then(handleResponse);
}

//прочитать все уроку в конкретном курсе
function getAllLessonsByCourse(course_id, user_id, teather_id) {
    return fetch(`${config.apiUrl}/lesson/read_by_course.php?courses_id=${course_id}&user_id=${user_id}&teather_id=${teather_id}`, config.GET).then(handleResponse);
}

// !!!-----!!!///

//создать проходимый урок
function createLessonPassed(course_id, lesson_id, user_id) {
    return fetch(`${config.apiUrl}/lessons_passed/create.php?course_id=${course_id}&lesson_id=${lesson_id}&user_id=${user_id}`, config.POST).then(handleResponse);
}

//обновить проходимый урок
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

//удалить проходимый урок
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

