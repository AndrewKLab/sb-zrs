import { courseConstants } from '../_constants';
import { courseService, categoryService } from '../_services';

export const courseActions = {
    createCourse,
    updateCourse,
    deleteCourse,
    readOneCourseById,
    getAllCoursesByCategoryName,
    getAllCoursesByAutor,
    createCoursePassed,
    updateCoursePassed,
    deleteCoursePassed,
    getAllPassedCourseByUser,
    getAllCourses,
    setCourseEditingStatus,
    setLessonEditingStatus,
    selectLesson
};

function createCourse(jwt, name, autor_id, category_name, img, description) {
    return dispatch => {
        dispatch(request(jwt, name, autor_id, category_name, img, description));

        return courseService.createCourse(jwt, name, autor_id, category_name, img, description)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.CREATE_COURSE_REQUEST } }
    function success(courses) { return { type: courseConstants.CREATE_COURSE_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.CREATE_COURSE_FAILURE, error } }
}

function updateCourse(jwt, course_id, name, autor_id, category_name, img, description, published) {
    return dispatch => {
        dispatch(request(jwt, course_id, name, autor_id, category_name, img, description, published));

        return courseService.updateCourse(jwt, course_id, name, autor_id, category_name, img, description, published)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.UPDATE_COURSE_REQUEST, jwt, course_id, name, autor_id, category_name, img, description, published } }
    function success(courses) { return { type: courseConstants.UPDATE_COURSE_SUCCESS, courses, jwt, course_id, name, autor_id, category_name, img, description, published } }
    function failure(error) { return { type: courseConstants.UPDATE_COURSE_FAILURE, error } }
}

function deleteCourse(jwt, course_id) {
    return dispatch => {
        dispatch(request(jwt, course_id));
        return courseService.deleteCourse(jwt, course_id)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.DELETE_COURSE_REQUEST, jwt, course_id } }
    function success(courses) { return { type: courseConstants.DELETE_COURSE_SUCCESS, courses, course_id } }
    function failure(error) { return { type: courseConstants.DELETE_COURSE_FAILURE, error } }
}

function readOneCourseById(course_id) {
    return dispatch => {
        dispatch(request(course_id));

        return courseService.readOneCourseById(course_id)
            .then(
                course => dispatch(success(course)),
                error => dispatch(failure(error))
            );
    };

    function request(course_id) { return { type: courseConstants.GETONE_COURSE_BY_ID_REQUEST, course_id } }
    function success(course) { return { type: courseConstants.GETONE_COURSE_BY_ID_SUCCESS, course } }
    function failure(error) { return { type: courseConstants.GETONE_COURSE_BY_ID_FAILURE, error } }
}

function setCourseEditingStatus(status) {
    return { type: courseConstants.SET_COURSE_EDITING_STATUS, status }
}

function setLessonEditingStatus(status) {
    return { type: courseConstants.SET_LESSON_EDITING_STATUS, status }
}

function selectLesson(lesson){
    return { type: courseConstants.SELECT_LESSON, lesson }
}

function getAllCoursesByCategoryName(category_name) {
    return dispatch => {
        dispatch(request(category_name));

        return courseService.getAllCoursesByCategoryName(category_name)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.GETALL_BY_CATEGORY_REQUEST } }
    function success(courses) { return { type: courseConstants.GETALL_BY_CATEGORY_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETALL_BY_CATEGORY_FAILURE, error } }
}

function getAllCoursesByAutor(autor_id) {
    return dispatch => {
        dispatch(request(autor_id));

        return courseService.getAllCoursesByAutor(autor_id)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.GETALL_BY_AUTOR_REQUEST } }
    function success(courses) { return { type: courseConstants.GETALL_BY_AUTOR_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETALL_BY_AUTOR_FAILURE, error } }
}

function createCoursePassed(jwt, course_id, user_id) {
    return dispatch => {
        dispatch(request());
        courseService.createCoursePassed(jwt, course_id, user_id)
        .then(
            res => dispatch(success(res.message, res.course)),
            error => dispatch(failure(error))
        );
    };
    function request() { return { type: courseConstants.CREATE_PASSED_COURSE_REQUEST } }
    function success(message, course) { return { type: courseConstants.CREATE_PASSED_COURSE_SUCCESS, message, course } }
    function failure(error) { return { type: courseConstants.CREATE_PASSED_COURSE_FAILURE, error } }
}

function updateCoursePassed(jwt, passed_course_id, status, assessment, start_time, finish_time) {
    return dispatch => {
        dispatch(request());
        return courseService.updateCoursePassed(jwt, passed_course_id, status, assessment, start_time, finish_time)
            .then(
                res => dispatch(success(res.message, res.course)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.UPDATE_PASSED_COURSE_REQUEST } }
    function success(message, course) { return { type: courseConstants.UPDATE_PASSED_COURSE_SUCCESS, message, course } }
    function failure(error) { return { type: courseConstants.UPDATE_PASSED_COURSE_FAILURE, error } }
}

function deleteCoursePassed(passed_course_id) {
    return dispatch => {
        courseService.deleteCoursePassed(passed_course_id)
            .then(
                dispatch(clear(passed_course_id))
            );
    };
    function clear(passed_course_id) { return { type: courseConstants.DELETE_PASSED_COURSE, passed_course_id } }
}

function getAllPassedCourseByUser(user_id, token) {
    return dispatch => {
        dispatch(request(user_id));

        return courseService.getAllPassedCourseByUser(user_id, token)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request(user_id) { return { type: courseConstants.GET_ALL_PASSED_COURSE_BY_USER_REQUEST, user_id } }
    function success(courses) { return { type: courseConstants.GET_ALL_PASSED_COURSE_BY_USER_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GET_ALL_PASSED_COURSE_BY_USER_FAILURE, error } }
}

function getAllCourses(jwt) {
    return dispatch => {
        dispatch(request());

        return courseService.readAllCourses(jwt)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.GET_ALL_COURSES_REQUEST } }
    function success(courses) { return { type: courseConstants.GET_ALL_COURSES_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GET_ALL_COURSES_FAILURE, error } }
}

