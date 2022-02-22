import { chatConstants } from '../_constants';

const initialState = {
    chats: [],
    selected_chat: null,

    chat_loading: true,
    chat_error: null,

    create_chat_loading: false,
    create_chat_error: null,
    create_chat_message: null,

    get_messages_by_chat_loading: false,
    get_messages_by_chat_error: null,
    get_messages_by_chat_message: null,

    get_more_messages_by_chat_loading: false,
    get_more_messages_by_chat_error: null,
    get_more_messages_by_chat_message: null,

    send_message_loading: false,
    send_message_error: null,
    send_message_message: null,

    check_new_messages_loading: false,
    check_new_messages_error: null,
}

export function chat(state = initialState, action) {
    switch (action.type) {
        //CREATE CHAT REQUEST
        case chatConstants.CREATE_CHAT_REQUEST:
            return {
                ...state,
                create_chat_loading: false,
                create_chat_error: null,
                create_chat_message: null,

            };
        case chatConstants.CREATE_CHAT_SUCCESS:
            return {
                ...state,
                create_chat_loading: true,
                create_chat_error: null,
                create_chat_message: action.message,
                selected_chat: action.chat,
            };
        case chatConstants.CREATE_CHAT_FAILURE:
            return {
                ...state,
                create_chat_loading: false,
                create_chat_error: null,
                create_chat_message: action.error,
            };
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

                selected_chat: { ...action.chat, messages: action.messages, offset: action.offset },
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

        case chatConstants.GET_NEW_MESSAGE:
            return {
                ...state,
                selected_chat: state.selected_chat === null ? state.selected_chat : {...state.selected_chat, messages: [...state.selected_chat.messages, action.message]}
            }

        //SEND MESSAGE
        case chatConstants.SEND_MESSAGE_REQUEST:
            return {
                ...state,
                send_message_loading: true,
                send_message_error: null,
                send_message_message: null,
            };
        case chatConstants.SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                send_message_loading: false,
                send_message_error: null,
                send_message_message: action.message,
                selected_chat: { ...state.selected_chat, messages: [...state.selected_chat.messages, action.message_item] },
                chats: state.chats.map((chat) => (chat.chat_id !== action.message_item.chat_id ? chat : ({ ...chat, messages: [...chat.messages, action.message_item] }))),
            };
        case chatConstants.SEND_MESSAGE_FAILURE:
            return {
                ...state,
                send_message_loading: false,
                send_message_error: action.error
            };

        //CHECK NEW MESSAGES
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