import { lessonConstants } from '../_constants';
import { lessonService } from '../_services';

export const lessonActions = {
    getAllLessonsByCourse
};



function getAllLessonsByCourse(course_id, user_id, teather_id) {
    return dispatch => {
        dispatch(request(course_id, user_id, teather_id));

        lessonService.getAllLessonsByCourse(course_id, user_id, teather_id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request(course_id, user_id, teather_id) { return { type: lessonConstants.GETALL_BY_COURSE_REQUEST, course_id, user_id, teather_id } }
    function success(data) { return { type: lessonConstants.GETALL_BY_COURSE_SUCCESS, data } }
    function failure(error) { return { type: lessonConstants.GETALL_BY_COURSE_FAILURE, error } }
}