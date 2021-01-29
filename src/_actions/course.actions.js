import { courseConstants } from '../_constants';
import { courseService } from '../_services';

export const courseActions = {
    createCourse,
    getAllCoursesByCategoryName,
    getAllCoursesByAutor,
    createCoursePassed,
    updateCoursePassed,
    deleteCoursePassed,
    getAllPassedCourseByUser
};

function createCourse(jwt, name, autor_id, category_name, img, description) {
    return dispatch => {
        console.log(img)
        dispatch(request(jwt, name, autor_id, category_name, img, description));

        return courseService.createCourse(jwt, name, autor_id, category_name, img, description)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.CREATE_COURSE_REQUEST, jwt, name, autor_id, category_name, img, description } }
    function success(courses) { return { type: courseConstants.CREATE_COURSE_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.CREATE_COURSE_FAILURE, error } }
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

function getAllCoursesByAutor(autor_id){
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

function createCoursePassed(course_id, user_id) {
    return dispatch => {
        courseService.createCoursePassed(course_id, user_id)
            .then(
                data => dispatch(create(data))
            );
    };
    function create(data) { return { type: courseConstants.CREATE_PASSED_COURSE, data } }
}

function updateCoursePassed(passed_course_id, status, assessment, start_time, finish_time) {
    return dispatch => {
        return courseService.updateCoursePassed(passed_course_id, status, assessment, start_time, finish_time)
            .then(
                dispatch(update(passed_course_id, status, assessment, start_time, finish_time))
            );
    };
    function update() { return { type: courseConstants.UPDATE_PASSED_COURSE, passed_course_id, status, assessment, start_time, finish_time } }
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

function getAllPassedCourseByUser(user_id) {
    return dispatch => {
        dispatch(request(user_id));

        return courseService.getAllPassedCourseByUser(user_id)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request(user_id) { return { type: courseConstants.GET_ALL_PASSED_COURSE_BY_USER_REQUEST, user_id} }
    function success(courses) { return { type: courseConstants.GET_ALL_PASSED_COURSE_BY_USER_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GET_ALL_PASSED_COURSE_BY_USER_FAILURE, error } }
}

