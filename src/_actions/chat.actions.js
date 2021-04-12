import { chatConstants } from '../_constants';
import { chatService } from '../_services';

export const chatActions = {
    getAllChatsByUser
};

function getAllChatsByUser(jwt) {
    return dispatch => {
        dispatch(request(jwt));

        return chatService.getAllChatsByUser(jwt)
            .then(
                cahts => dispatch(success(cahts)),
                error => dispatch(failure(error))
            );
    };
    function request(jwt) { return { type: chatConstants.GET_ALL_CHATS_BY_USER_REQUEST, jwt } }
    function success(chats) { return { type: chatConstants.GET_ALL_CHATS_BY_USER_SUCCESS, chats } }
    function failure(error) { return { type: chatConstants.GET_ALL_CHATS_BY_USER_FAILURE, error } }
}