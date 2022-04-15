import { categoryConstants } from '../_constants';
const initialState = {
  basic: null,
  social: null,
  special: null,
  national: null,

  loading: false,
}
export function categories(state = initialState, action) {
  switch (action.type) {
    //GET ALL CATEGORIES
    case categoryConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        loading: false,
        basic: action.categories.basic,
        social: action.categories.social,
        special: action.categories.special,
        national: action.categories.national
      };
    case categoryConstants.GETALL_FAILURE:
      return {
        loading: false,
        error: action.error
      };
    default:
      return state
  }
}