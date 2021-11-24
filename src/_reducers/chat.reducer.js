import { chatConstants } from '../_constants';

const initialState = {
    chats: [],
    selected_chat: null,

    chat_loading: true,
    chat_error: null,

    get_messages_by_chat_loading: false,
    get_messages_by_chat_error: null,
    get_messages_by_chat_message: null,

    get_more_messages_by_chat_loading: false,
    get_more_messages_by_chat_error: null,
    get_more_messages_by_chat_message: null,

    send_message_error: null,
    send_message_loading: false,
    check_new_messages_loading: false,
    check_new_messages_error: null,
}

export function chat(state = initialState, action) {
    switch (action.type) {
        //GET ALL CHATS BY USER
        case chatConstants.GET_ALL_CHATS_BY_USER_REQUEST:
            return {
                ...state,
                chat_loading: true,
                get_more_messages_by_chat_error: null,
            };
        case chatConstants.GET_ALL_CHATS_BY_USER_SUCCESS:
            return {
                ...state,
                chat_loading: false,
                chats: action.chats.chats,
                get_more_messages_by_chat_error: null,
            };
        case chatConstants.GET_ALL_CHATS_BY_USER_FAILURE:
            return {
                ...state,
                chat_loading: false,
                get_more_messages_by_chat_error: null,
                chat_error: action.error,
            };

        //GET MESSAGES BY CHAT
        case chatConstants.GET_ALL_MESSAGES_BY_CHAT_REQUEST:
            return {
                ...state,
                get_more_messages_by_chat_loading: false,

                get_messages_by_chat_loading: true,
                get_messages_by_chat_error: null,
                get_messages_by_chat_message: null,
            };
        case chatConstants.GET_ALL_MESSAGES_BY_CHAT_SUCCESS:
            return {
                ...state,               
                get_messages_by_chat_loading: false,
                get_messages_by_chat_error: null,
                get_messages_by_chat_message: action.message,

                get_more_messages_by_chat_loading: false,
                get_more_messages_by_chat_error: null,

                selected_chat: {...action.chat, messages: action.messages},
                chats: state.chats.map((chat) => (chat.chat_id !== action.chat.chat_id ? chat : ({ ...chat, messages: action.messages, offset: 20 })))
            };
        case chatConstants.GET_ALL_MESSAGES_BY_CHAT_FAILURE:
            return {
                ...state,
                get_messages_by_chat_loading: false,
                get_messages_by_chat_error: action.error,
                get_messages_by_chat_message: null,
            };

        //GET MORE MESSAGES BY CHAT
        case chatConstants.GET_MORE_MESSAGES_BY_CHAT_REQUEST:
            return {
                ...state,
                get_more_messages_by_chat_loading: true
            };
        case chatConstants.GET_MORE_MESSAGES_BY_CHAT_SUCCESS:
            return {
                ...state,
                get_more_messages_by_chat_loading: false,
                chats: state.chats.map((chat) => (chat.chat_id !== action.chat_id ? chat : ({ ...chat, messages: [...action.messages, ...chat.messages], offset: chat.offset + 20 }))),
            };
        case chatConstants.GET_MORE_MESSAGES_BY_CHAT_FAILURE:
            return {
                ...state,
                get_more_messages_by_chat_loading: false,
                get_more_messages_by_chat_error: action.error
            };


        //SELECT_OPEN_CHAT
        case chatConstants.SELECT_OPEN_CHAT:
            return {
                ...state,
                selected_chat: action.chat_id,
                get_more_messages_by_chat_error: null
            };

        //SEND MESSAGE
        case chatConstants.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                send_message_loading: true
            };
        case chatConstants.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                send_message_loading: false,
                chats: state.chats.map((chat) => (chat.chat_id !== action.done.message_item.chat_id ? chat : ({ ...chat, messages: [...chat.messages, action.done.message_item,] }))),
            };
        case chatConstants.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                send_message_loading: false,
                send_message_error: action.error
            };

        //SEND MESSAGE
        case chatConstants.CHECK_NEW_MESSAGES_REQUEST:
            return {
                ...state,
                check_new_messages_loading: true
            };
        case chatConstants.CHECK_NEW_MESSAGES_SUCCESS:
            return {
                ...state,
                check_new_messages_loading: false,
                check_new_messages_error: null,
                chats: state.chats.map((chat) => (chat.chat_id !== action.chat_id ? chat : ({ ...chat, messages: [...chat.messages, ...action.messages,] }))),
            };
        case chatConstants.CHECK_NEW_MESSAGES_FAILURE:
            return {
                ...state,
                check_new_messages_loading: false,
                check_new_messages_error: action.error
            };
        default:
            return state
    }
}