import { lessonConstants } from '../_constants';
import { lessonService } from '../_services';

export const lessonActions = {
    getAllLessonsByCourse,
    createLessonPassed,
    updateLessonPassed,
    deleteAllPassedLessonsByCourse
};



function getAllLessonsByCourse(course_id, user_id, teather_id) {
    return dispatch => {
        dispatch(request(course_id, user_id, teather_id));

        return lessonService.getAllLessonsByCourse(course_id, user_id, teather_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request(course_id, user_id, teather_id) { return { type: lessonConstants.GETALL_BY_COURSE_REQUEST, course_id, user_id, teather_id } }
    function success(data) { return { type: lessonConstants.GETALL_BY_COURSE_SUCCESS, data } }
    function failure(error) { return { type: lessonConstants.GETALL_BY_COURSE_FAILURE, error } }
}

function createLessonPassed(course_id, lesson_id, user_id) {
    return dispatch => {
        dispatch(request(course_id, lesson_id, user_id));
        return lessonService.createLessonPassed(course_id, lesson_id, user_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request(course_id, lesson_id, user_id) { return { type: lessonConstants.CREATE_PASSED_LESSON_REQUEST, course_id, lesson_id, user_id} }
    function success(data) { return { type: lessonConstants.CREATE_PASSED_LESSON_SUCCESS, data } }
    function failure(error) { return { type: lessonConstants.CREATE_PASSED_LESSON_FAILURE, error } }
}

function updateLessonPassed(passed_id, assessment, finish_time) {
    return dispatch => {
        return lessonService.updateLessonPassed(passed_id, assessment, finish_time)
            .then(
                dispatch(update(passed_id, assessment, finish_time))
            );
    };
    function update() { return { type: lessonConstants.UPDATE_PASSED_LESSON, passed_id, assessment, finish_time } }
}

function deleteAllPassedLessonsByCourse(course_id, user_id){
    return dispatch => {
        return lessonService.deleteAllPassedLessonsByCourse(course_id, user_id)
            .then(
                dispatch(clear())
            );
    };
    function clear() { return { type: lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE } }
}