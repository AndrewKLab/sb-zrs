import { chatConstants } from '../_constants';

const initialState = {
    chat_loading: true,
    message_loadmore_loading: false,
    message_loadmore_error: null
}

export function chat(state = initialState, action) {
    switch (action.type) {
        //GET ALL CHATS BY USER
        case chatConstants.GET_ALL_CHATS_BY_USER_REQUEST:
            return {
                ...state,
                chat_loading: true
            };
        case chatConstants.GET_ALL_CHATS_BY_USER_SUCCESS:
            return {
                ...state,
                chat_loading: false,
                chats: action.chats.chats
            };
        case chatConstants.GET_ALL_CHATS_BY_USER_FAILURE:
            return {
                ...state,
                chat_loading: false,
                error: action.error
            };

        //GET MESSAGES BY CHAT
        case chatConstants.GET_ALL_MESSAGES_BY_CHAT_REQUEST:
            return {
                ...state,
                message_loadmore_loading: false,
                message_loading: true
            };
        case chatConstants.GET_ALL_MESSAGES_BY_CHAT_SUCCESS:
            return {
                ...state,
                selected_chat: action.chat_id,
                message_loading: false,
                message_loadmore_loading: false,
                message_loadmore_error: null,
                chats: state.chats.map((chat) => (chat.chat_id !== action.chat_id ? chat : ({ ...chat, messages: action.messages })))
            };
        case chatConstants.GET_ALL_MESSAGES_BY_CHAT_FAILURE:
            return {
                ...state,
                message_loading: false,
                message_loadmore_loading: false,
                error: action.error
            };

        //GET MORE MESSAGES BY CHAT
        case chatConstants.GET_MORE_MESSAGES_BY_CHAT_REQUEST:
            return {
                ...state,
                message_loadmore_loading: true
            };
        case chatConstants.GET_MORE_MESSAGES_BY_CHAT_SUCCESS:
            return {
                ...state,
                message_loadmore_loading: false,
                chats: state.chats.map((chat) => (chat.chat_id !== action.chat_id ? chat : ({ ...chat, messages: [...action.messages, ...chat.messages] }))),
            };
        case chatConstants.GET_MORE_MESSAGES_BY_CHAT_FAILURE:
            return {
                ...state,
                message_loadmore_loading: false,
                message_loadmore_error: action.error
            };


        //
        default:
            return state
    }
}