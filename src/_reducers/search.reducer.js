import { searchConstants } from '../_constants';

export function search(state = {}, action) {
  switch (action.type) {
    case searchConstants.SEARCH_REQUEST:
      return {
          search: "Поиск..."
      };
    case searchConstants.SEARCH_SUCCESS:
      return {
        search: action.data
      };
    case searchConstants.SEARCH_FAILURE:
      return {
            search: action.error
      };
    default:
      return state
  }
}