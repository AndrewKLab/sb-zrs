import { categoryConstants } from '../_constants';

export function categories(state = {}, action) {
    switch (action.type) {
        case categoryConstants.GETALL_REQUEST:
          return {
            loading: true
          };
        case categoryConstants.GETALL_SUCCESS:
          return {
            loading: false,
            main: action.categories.main,
            social: action.categories.social,
            special: action.categories.special,
            national: action.categories.national
          };
        case categoryConstants.GETALL_FAILURE:
          return { 
            error: action.error
          };
        default:
          return state
      }
}