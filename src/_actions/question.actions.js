import { questionConstants } from '../_constants';
import { questionService } from '../_services';

export const questionActions = {
    updateQuestion,
};


function updateQuestion(jwt, question_id, question, question_type, lesson_id) {
    return dispatch => {
        dispatch(request());
        return questionService.updateQuestion(jwt, question_id, question, question_type)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: questionConstants.UPDATE_QUESTION_REQUEST } }
    function success(data) { return { type: questionConstants.UPDATE_QUESTION_SUCCESS, data, jwt, question_id, question, question_type, lesson_id} }
    function failure(error) { return { type: questionConstants.UPDATE_QUESTION_FAILURE, error } }
}




