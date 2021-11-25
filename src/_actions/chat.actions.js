import { chatConstants } from '../_constants';
import { chatService } from '../_services';

export const chatActions = {
    getAllChatsByUser,
    getMessagesByChat,
    getMoreMessagesByChat,
    selectOpenChat,
    sendMessage,
    checkNewMessagesByChat,
    createChat
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


function getMessagesByChat(jwt, chat, offset) {
    return dispatch => {
        dispatch(request());
        console.log(chat.chat_id)
        return chatService.getMessagesByChat(jwt, chat.chat_id, offset)
            .then(
                done => dispatch(success(chat, done.message, done.messages)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: chatConstants.GET_ALL_MESSAGES_BY_CHAT_REQUEST } }
    function success(chat, message, messages) { return { type: chatConstants.GET_ALL_MESSAGES_BY_CHAT_SUCCESS, chat, message, messages } }
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
        dispatch(request());

        return chatService.sendMessage(jwt, to, message)
            .then(
                done => dispatch(success(done.message, done.message_item)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: chatConstants.SEND_MESSAGE_REQUEST } }
    function success(message, message_item) { return { type: chatConstants.SEND_MESSAGE_SUCCESS, message, message_item} }
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

function createChat(jwt, target) {
    return dispatch => {
        dispatch(request());

        return chatService.createChat(jwt, target)
            .then(
                done => dispatch(success(done.message, done.chat)),
                error => dispatch(failure(error))
            );
    };
    function request() { return { type: chatConstants.CREATE_CHAT_REQUEST } }
    function success(message, chat) { return { type: chatConstants.CREATE_CHAT_SUCCESS, message, chat } }
    function failure(error) { return { type: chatConstants.CREATE_CHAT_FAILURE, error } }
}