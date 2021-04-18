import { messageConstants } from '../_constants';

const initialState = {
    message_loadmore_loading: false,
}

export function message(state = initialState, action) {
    switch (action.type) {
        //GET MESSAGES BY CHAT
        case messageConstants.GET_ALL_MESSAGES_BY_CHAT_REQUEST:
            return {
                ...state,
                message_loading: true
            };
        case messageConstants.GET_ALL_MESSAGES_BY_CHAT_SUCCESS:
            return {
                ...state,
                message_loading: false,
                messages: action.messages
            };
        case messageConstants.GET_ALL_MESSAGES_BY_CHAT_FAILURE:
            return {
                ...state,
                message_loading: false,
                error: action.error
            };

        //GET MORE MESSAGES BY CHAT
        case messageConstants.GET_MORE_MESSAGES_BY_CHAT_REQUEST:
            return {
                ...state,
                message_loadmore_loading: true
            };
        case messageConstants.GET_MORE_MESSAGES_BY_CHAT_SUCCESS:
            return {
                ...state,
                message_loadmore_loading: false,
                messages: [...action.messages, ...state.messages],
            };
        case messageConstants.GET_MORE_MESSAGES_BY_CHAT_FAILURE:
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