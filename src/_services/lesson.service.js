import config from 'config';

export const lessonService = {
    //lessons
    createLesson,
    updateLesson,
    deleteLesson,
    getAllLessonsByCourse,
    readOneLessonById,

    //lessons_passed
    createLessonPassed,
    updateLessonPassed,
    deleteAllPassedLessonsByCourse
};

//создать урок
function createLesson(jwt, course_id, lesson_number, lesson_name, lesson_videolink, lesson_description, lesson_text, lesson_questions) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify({
            lesson_number,
            lesson_name,
            lesson_videolink,
            lesson_description,
            lesson_text,
            lesson_questions
        })
    };

    return fetch(`/api/lesson/create.php?course_id=${course_id}`, requestOptions).then(handleResponse);
}

//обновить урок
function updateLesson(jwt, lesson_id, lesson_number, lesson_name, lesson_videolink, lesson_description, lesson_text, lesson_questions) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
        body: JSON.stringify({
            lesson_number,
            lesson_name,
            lesson_videolink,
            lesson_description,
            lesson_text,
            lesson_questions
        })
    };

    return fetch(`/api/lesson/update.php?lesson_id=${lesson_id}`, requestOptions).then(handleResponse);
}

//удалить урок
function deleteLesson(jwt, lesson_id, course_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${jwt}` },
    };

    return fetch(`/api/lesson/delete.php?course_id=${course_id}&lesson_id=${lesson_id}`, requestOptions).then(handleResponse);
}

//прочитать все уроку в конкретном курсе
function getAllLessonsByCourse(course_id, user_id, teather_id) {
    return fetch(`${config.apiUrl}/lesson/read_by_course.php?courses_id=${course_id}&user_id=${user_id}&teather_id=${teather_id}`, config.GET).then(handleResponse);
}

//Получить один урок по id
function readOneLessonById(lesson_id) {
    return fetch(`${config.apiUrl}/lesson/read_one.php?lesson_id=${lesson_id}`, config.GET).then(handleResponse);
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

