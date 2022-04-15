import { lessonConstants } from '../_constants';
import { lessonService } from '../_services';

export const lessonActions = {
    //lesson
    createLesson,
    updateLesson,
    deleteLesson,
    getAllLessonsByCourse,
    clearCreatedLessonData,
    readOneLessonById,
    setLessonEditingData,
    setInprocessLesson,

    //lesson test
    changeLessonTestEditingStatus,
    selectLessonTestQuestion,
    createLessonTestQuestion,
    updateLessonTestQuestion,
    deleteLessonTestQuestion,

    //passed_lesson
    createLessonPassed,
    updateLessonPassed,
    deleteAllPassedLessonsByCourse,
    clearMessageAndError,
    checkPassedLessonAnswers
};

//создать урок
function createLesson(jwt, course_id, number, name, videolink, descrigtion, text, questions) {
    return dispatch => {
        dispatch(request(jwt, course_id, number, name, videolink, descrigtion, text, questions));
        return lessonService.createLesson(jwt, course_id, number, name, videolink, descrigtion, text, questions)
            .then(
                lesson => dispatch(success(lesson)),
                error => dispatch(failure(error))
            );
    };

    function request(jwt, course_id, number, name, videolink, descrigtion, text) { return { type: lessonConstants.CREATE_LESSON_REQUEST, jwt, course_id, number, name, videolink, descrigtion, text, questions } }
    function success(lesson) { return { type: lessonConstants.CREATE_LESSON_SUCCESS, lesson } }
    function failure(error) { return { type: lessonConstants.CREATE_LESSON_FAILURE, error } }
}

//обновть урок
function updateLesson(jwt, lesson_id, number, name, videolink, description, text, questions) {
    return dispatch => {
        dispatch(request(jwt, lesson_id, number, name, videolink, description, text, questions));
        return lessonService.updateLesson(jwt, lesson_id, number, name, videolink, description, text, questions)
            .then(
                lesson => dispatch(success(lesson)),
                error => dispatch(failure(error))
            );
    };

    function request(jwt, lesson_id, number, name, videolink, description, text, questions) { return { type: lessonConstants.UPDATE_LESSON_REQUEST, jwt, lesson_id, number, name, videolink, description, text, questions } }
    function success(lesson) { return { type: lessonConstants.UPDATE_LESSON_SUCCESS, lesson } }
    function failure(error) { return { type: lessonConstants.UPDATE_LESSON_FAILURE, error } }
}

//удалить урок
function deleteLesson(jwt, lesson_id, course_id) {
    return dispatch => {
        dispatch(request(jwt, lesson_id, course_id));
        return lessonService.deleteLesson(jwt, lesson_id, course_id)
            .then(
                lesson => dispatch(success(lesson)),
                error => dispatch(failure(error))
            );
    };

    function request(jwt, lesson_id, course_id) { return { type: lessonConstants.DELETE_LESSON_REQUEST, jwt, lesson_id, course_id } }
    function success(lesson) { return { type: lessonConstants.DELETE_LESSON_SUCCESS, lesson, lesson_id } }
    function failure(error) { return { type: lessonConstants.DELETE_LESSON_FAILURE, error } }
}


function setInprocessLesson(lesson) {
    return { type: lessonConstants.SET_INPROCESS_LESSON, lesson }
}

function getAllLessonsByCourse(course_id, user_id, teather_id) {
    return dispatch => {
        dispatch(request());

        return lessonService.getAllLessonsByCourse(course_id, user_id, teather_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: lessonConstants.GETALL_BY_COURSE_REQUEST } }
    function success(data) { return { type: lessonConstants.GETALL_BY_COURSE_SUCCESS, data } }
    function failure(error) { return { type: lessonConstants.GETALL_BY_COURSE_FAILURE, error } }
}

function readOneLessonById(lesson_id) {
    return dispatch => {
        dispatch(request(lesson_id));
        return lessonService.readOneLessonById(lesson_id)
            .then(
                lesson => dispatch(success(lesson)),
                error => dispatch(failure(error))
            );
    };

    function request(lesson_id) { return { type: lessonConstants.READ_ONE_LESSON_BY_ID_REQUEST, lesson_id } }
    function success(lesson) { return { type: lessonConstants.READ_ONE_LESSON_BY_ID_SUCCESS, lesson } }
    function failure(error) { return { type: lessonConstants.READ_ONE_LESSON_BY_ID_FAILURE, error } }
}

function setLessonEditingData() {
    return dispatch => {

        dispatch(request());
        async function f() {
            return 1;
        }
        return f().then(() => dispatch(success()));
    };

    function request() { return { type: lessonConstants.SET_LESSON_EDITING_DATA_REQUEST } }
    function success() { return { type: lessonConstants.SET_LESSON_EDITING_DATA_SUCCESS } }
    function failure() { return { type: lessonConstants.SET_LESSON_EDITING_DATA_FAILURE } }
}

//==========//

//Lesson Test
function changeLessonTestEditingStatus(status) {
    return { type: lessonConstants.CHANGE_LESSON_TEST_EDITING_STATUS, status }
}

function selectLessonTestQuestion(question, index) {
    return { type: lessonConstants.SELECT_LESSON_TEST_QUESTION, question, index }
}

function createLessonTestQuestion(question) {
    return { type: lessonConstants.CREATE_LESSON_TEST_QUESTION, question }
}

function updateLessonTestQuestion(question) {
    return { type: lessonConstants.UPDATE_LESSON_TEST_QUESTION, question }
}

function deleteLessonTestQuestion(question) {
    return { type: lessonConstants.DELETE_LESSON_TEST_QUESTION, question }
}

//==========//

function createLessonPassed(token, course_id, lesson_id, user_id) {
    return dispatch => {
        dispatch(request());
        return lessonService.createLessonPassed(token, course_id, lesson_id, user_id)
            .then(
                res => dispatch(success(res.message, res.lesson)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: lessonConstants.CREATE_PASSED_LESSON_REQUEST } }
    function success(message, lesson) { return { type: lessonConstants.CREATE_PASSED_LESSON_SUCCESS, message, lesson } }
    function failure(error) { return { type: lessonConstants.CREATE_PASSED_LESSON_FAILURE, error } }
}

function updateLessonPassed(token, passed_id, assessment, finish_time, user_answers) {
    return dispatch => {
        dispatch(request());
        return lessonService.updateLessonPassed(token, passed_id, assessment, finish_time, user_answers)
            .then(
                res => dispatch(success(res.message, res.lesson)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: lessonConstants.UPDATE_PASSED_LESSON_REQUEST } }
    function success(message, lesson) { return { type: lessonConstants.UPDATE_PASSED_LESSON_SUCCESS, message, lesson } }
    function failure(error) { return { type: lessonConstants.UPDATE_PASSED_LESSON_FAILURE, error } }
}

function deleteAllPassedLessonsByCourse(jwt, course_id, user_id) {
    return dispatch => {
        dispatch(request())
        return lessonService.deleteAllPassedLessonsByCourse(jwt, course_id, user_id)
            .then(
                res => dispatch(success(res.message)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE_REQUEST } }
    function success(message) { return { type: lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE_SUCCESS, message } }
    function failure(error) { return { type: lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE_FAILURE, error } }

}

function checkPassedLessonAnswers(token, passed_lesson_id) {
    return dispatch => {
        dispatch(request())
        return lessonService.checkPassedLessonAnswers(token, passed_lesson_id)
            .then(
                res => dispatch(success(res.message, res.lesson_passed)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: lessonConstants.CHECK_PASSED_LESSON_ANSWERS_REQUEST } }
    function success(message, lesson_passed) { return { type: lessonConstants.CHECK_PASSED_LESSON_ANSWERS_SUCCESS, message, lesson_passed } }
    function failure(error) { return { type: lessonConstants.CHECK_PASSED_LESSON_ANSWERS_FAILURE, error } }

}


function clearMessageAndError() {
    return { type: lessonConstants.CLEAR_MESSAGE_AND_ERROR };
}

function clearCreatedLessonData() {
    return { type: lessonConstants.CLEAR_CREATED_LESSON_DATA };
}