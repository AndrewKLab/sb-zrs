import { searchConstants } from '../_constants';
import { searchService } from '../_services';

export const searchActions = {
    search
};

function search(keywords) {
    return dispatch => {
        return searchService.search(keywords)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function success(data) { return { type: searchConstants.SEARCH_SUCCESS, data } }
    function failure(error) { return { type: searchConstants.SEARCH_FAILURE, error } }
}