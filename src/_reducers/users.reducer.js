import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.GETALL_TEATHERS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_TEATHERS_SUCCESS:
      return {
        teathers: action.teathers.teathers
      };
    case userConstants.GETALL_TEATHERS_FAILURE:
      return { 
        error: action.error
      };
    default:
      return state
  }
}