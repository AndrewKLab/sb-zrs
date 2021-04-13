import { messageConstants } from '../_constants';

const initialState = {
}

export function message(state = initialState, action) {
    switch (action.type) {
        //GET ALL MESSAGES BY CHAT
        case messageConstants.GET_ALL_MESSAGES_BY_CHAT_REQUEST:
            return {
                message_loading: true
            };
        case messageConstants.GET_ALL_MESSAGES_BY_CHAT_SUCCESS:
            return {
                message_loading: false,
                messages: action.messages
            };
        case messageConstants.GET_ALL_MESSAGES_BY_CHAT_FAILURE:
            return {
                message_loading: false,
                error: action.error
            };

        //
        default:
            return state
    }
}