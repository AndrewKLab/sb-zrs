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
    deleteAllPassedLessonsByCourse,
    checkPassedLessonAnswers
};

//создать урок
function createLesson(token, course_id, lesson_number, lesson_name, lesson_videolink, lesson_description, lesson_text, lesson_questions) {
        const formData = new FormData();
    
        formData.append('lesson_number', lesson_number);
        formData.append('lesson_name', lesson_name);
        formData.append('lesson_description', lesson_description);
        formData.append('lesson_text', lesson_text);
        formData.append('lesson_questions', JSON.stringify(lesson_questions));
        formData.append('lesson_videolink', lesson_videolink);
    
        const requestOptions = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
        };
    

    return fetch(`/api/lesson/create.php?course_id=${course_id}`, requestOptions).then(handleResponse);
}

//обновить урок
function updateLesson(jwt, lesson_id, lesson_number, lesson_name, lesson_videolink, lesson_description, lesson_text, lesson_questions) {
    const formData = new FormData();
    
    formData.append('lesson_number', lesson_number);
    formData.append('lesson_name', lesson_name);
    formData.append('lesson_description', lesson_description);
    formData.append('lesson_text', lesson_text);
    formData.append('lesson_questions', JSON.stringify(lesson_questions));
    formData.append('lesson_videolink', lesson_videolink);

    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${jwt}` },
        body: formData
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
function createLessonPassed(token, course_id, lesson_id, user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    };
    return fetch(`/api/lessons_passed/create.php?course_id=${course_id}&lesson_id=${lesson_id}&user_id=${user_id}`, requestOptions).then(handleResponse);
}

//обновить проходимый урок
function updateLessonPassed(token, passed_id, assessment, finish_time, user_answers) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
            finish_time,
            status: "finished",
            assessment,
            user_answers
        })
    };

    return fetch(`/api/lessons_passed/update.php?id=${passed_id}`,requestOptions).then(handleResponse);
}

//удалить проходимый урок
function deleteAllPassedLessonsByCourse(token, course_id, user_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
    };
    return fetch(`/api/lessons_passed/delete_all_by_course_passed.php?course_id=${course_id}&user_id=${user_id}`, requestOptions).then(handleResponse);
}

function checkPassedLessonAnswers(token, passed_lesson_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
    };
    return fetch(`/api/lesson/check_lesson_answers.php?passed_lesson_id=${passed_lesson_id}`, requestOptions).then(handleResponse);
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

