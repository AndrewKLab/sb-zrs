import { userConstants } from '../_constants';

let jwt = localStorage.getItem('user');

const initialState = jwt ? { loggedIn: true, jwt: jwt } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    //SIGN-IN
    case userConstants.SIGNIN_REQUEST:
      return {
        signing: true,
        user: action.user
      };
    case userConstants.SIGNIN_SUCCESS:
      return {
        loggedIn: true,
        jwt: action.user.jwt,
        user: action.user.user
      };
    case userConstants.SIGNIN_FAILURE:
      return {};

    //SIGN-UP
    case userConstants.SIGNUP_REQUEST:
      return {
        signuping: true,
        user: action.user
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        signuping: true,
        message: action.user.message,
      };
    case userConstants.SIGNUP_FAILURE:
      return {};

    //LOGOUT
    case userConstants.LOGOUT:
      return {};
    default:
      return state

    //VALIDATE-USER
    case userConstants.VALIDATE_REQUEST:
      return {
        user: action.user
      };
    case userConstants.VALIDATE_SUCCESS:
      return {
        jwt: action.user.jwt,
        user: action.user.user,
      };
    case userConstants.VALIDATE_FAILURE:
      return {};
  }
}