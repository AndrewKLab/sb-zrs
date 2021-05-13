import { chatConstants } from '../_constants';
import { chatService } from '../_services';

export const chatActions = {
    getAllChatsByUser,
    getMessagesByChat,
    getMoreMessagesByChat,
    selectOpenChat,
    sendMessage,
    checkNewMessagesByChat
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


function getMessagesByChat(jwt, chat_id, offset) {
    return dispatch => {
        dispatch(request(jwt, chat_id, offset));

        return chatService.getMessagesByChat(jwt, chat_id, offset)
            .then(
                messages => dispatch(success(chat_id, messages)),
                error => dispatch(failure(error))
            );
    };
    function request(jwt, chat_id, offset) { return { type: chatConstants.GET_ALL_MESSAGES_BY_CHAT_REQUEST, jwt, chat_id, offset } }
    function success(chat_id, messages) { return { type: chatConstants.GET_ALL_MESSAGES_BY_CHAT_SUCCESS, chat_id, messages } }
    function failure(error) { return { type: chatConstants.GET_ALL_MESSAGES_BY_CHAT_FAILURE, error } }
}

function getMoreMessagesByChat(jwt, chat_id, offset) {
    return dispatch => {
        dispatch(request(jwt, chat_id, offset));

        return chatService.getMessagesByChat(jwt, chat_id, offset)
            .then(
                messages => dispatch(success(chat_id, messages)),
                error => dispatch(failure(error))
            );
    };
    function request(jwt, chat_id, offset) { return { type: chatConstants.GET_MORE_MESSAGES_BY_CHAT_REQUEST, jwt, chat_id, offset } }
    function success(chat_id, messages) { return { type: chatConstants.GET_MORE_MESSAGES_BY_CHAT_SUCCESS, chat_id, messages } }
    function failure(error) { return { type: chatConstants.GET_MORE_MESSAGES_BY_CHAT_FAILURE, error } }
}

function selectOpenChat(chat_id) { return { type: chatConstants.SELECT_OPEN_CHAT, chat_id } }

function sendMessage(jwt, to, message) {
    return dispatch => {
        dispatch(request(jwt, to, message));

        return chatService.sendMessage(jwt, to, message)
            .then(
                done => dispatch(success(jwt, to, message, done)),
                error => dispatch(failure(error))
            );
    };
    function request(jwt, to, message) { return { type: chatConstants.SEND_MESSAGE_REQUEST, jwt, to, message } }
    function success(jwt, to, message, done) { return { type: chatConstants.SEND_MESSAGE_SUCCESS, jwt, to, message, done } }
    function failure(error) { return { type: chatConstants.SEND_MESSAGE_FAILURE, error } }
}

function checkNewMessagesByChat(jwt, chat_id, send_from) {
    return dispatch => {
        dispatch(request(jwt, chat_id, send_from));

        return chatService.checkNewMessagesByChat(jwt, chat_id, send_from)
            .then(
                messages => dispatch(success(chat_id, messages)),
                error => dispatch(failure(error))
            );
    };
    function request(jwt, chat_id, send_from) { return { type: chatConstants.CHECK_NEW_MESSAGES_REQUEST, jwt, chat_id, send_from } }
    function success(chat_id, messages) { return { type: chatConstants.CHECK_NEW_MESSAGES_SUCCESS, chat_id, messages } }
    function failure(error) { return { type: chatConstants.CHECK_NEW_MESSAGES_FAILURE, error } }
}