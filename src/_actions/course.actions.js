import { courseConstants } from '../_constants';
import { courseService } from '../_services';

export const courseActions = {
    getAllCoursesByCategoryName
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