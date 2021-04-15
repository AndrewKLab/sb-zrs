import { messageConstants } from '../_constants';
import { messageService } from '../_services';

export const messageActions = {
    getMessagesByChat,
    getMoreMessagesByChat
};

function getMessagesByChat(jwt, chat_id, offset) {
    return dispatch => {
        dispatch(request(jwt, chat_id, offset));

        return messageService.getMessagesByChat(jwt, chat_id, offset)
            .then(
                messages => dispatch(success(messages)),
                error => dispatch(failure(error))
            );
    };
    function request(jwt, chat_id, offset) { return { type: messageConstants.GET_ALL_MESSAGES_BY_CHAT_REQUEST, jwt, chat_id, offset } }
    function success(messages) { return { type: messageConstants.GET_ALL_MESSAGES_BY_CHAT_SUCCESS, messages } }
    function failure(error) { return { type: messageConstants.GET_ALL_MESSAGES_BY_CHAT_FAILURE, error } }
}

function getMoreMessagesByChat(jwt, chat_id, offset) {
    return dispatch => {
        dispatch(request(jwt, chat_id, offset));

        return messageService.getMessagesByChat(jwt, chat_id, offset)
            .then(
                messages => dispatch(success(messages)),
                error => dispatch(failure(error))
            );
    };
    function request(jwt, chat_id, offset) { return { type: messageConstants.GET_MORE_MESSAGES_BY_CHAT_REQUEST, jwt, chat_id, offset } }
    function success(messages) { return { type: messageConstants.GET_MORE_MESSAGES_BY_CHAT_SUCCESS, messages } }
    function failure(error) { return { type: messageConstants.GET_MORE_MESSAGES_BY_CHAT_FAILURE, error } }
}