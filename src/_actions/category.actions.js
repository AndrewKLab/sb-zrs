import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';

export const categoryActions = {
    getAllCategories,
    getOneCategory
};


function getAllCategories() {
    return dispatch => {
        dispatch(request());

        return categoryService.getAllCategories()
            .then(
                categories => dispatch(success(categories)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categories) { return { type: categoryConstants.GETALL_SUCCESS, categories } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

function getOneCategory(category_name) {
    return dispatch => {
        dispatch(request(category_name));

        categoryService.getOneCategory(category_name)
            .then(
                courses => dispatch(success(courses)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: categoryConstants.GETONE_REQUEST } }
    function success(courses) { return { type: categoryConstants.GETONE_SUCCESS, courses } }
    function failure(error) { return { type: categoryConstants.GETONE_FAILURE, error } }
}