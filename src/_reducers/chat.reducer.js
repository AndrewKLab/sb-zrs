import { chatConstants } from '../_constants';

const initialState = {
    caht_loading: true
}

export function chat(state = initialState, action) {
    switch (action.type) {
        //GET ALL CHATS BY USER
        case chatConstants.GET_ALL_CHATS_BY_USER_REQUEST:
            return {
                caht_loading: true
            };
        case chatConstants.GET_ALL_CHATS_BY_USER_SUCCESS:
            return {
                caht_loading: false,
                chats: action.chats.chats
            };
        case chatConstants.GET_ALL_CHATS_BY_USER_FAILURE:
            return {
                caht_loading: false,
                error: action.error
            };

        //
        default:
            return state
    }
}