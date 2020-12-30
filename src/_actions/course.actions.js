import { courseConstants } from '../_constants';
import { courseService } from '../_services';

export const courseActions = {
    getAllCoursesByCategoryName,
    createCoursePassed,
    updateCoursePassed,
    deleteCoursePassed
};

function getAllCoursesByCategoryName(category_name) {
    return dispatch => {
        dispatch(request(category_name));

        courseService.getAllCoursesByCategoryName(category_name)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: courseConstants.GETALL_BY_CATEGORY_REQUEST } }
    function success(courses) { return { type: courseConstants.GETALL_BY_CATEGORY_SUCCESS, courses } }
    function failure(error) { return { type: courseConstants.GETALL_BY_CATEGORY_FAILURE, error } }
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
        courseService.updateCoursePassed(passed_course_id, status, assessment, start_time, finish_time)
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