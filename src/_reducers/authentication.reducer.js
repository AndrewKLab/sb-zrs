import { userConstants } from '../_constants';

const initialState = {
  isLogined: false,
  jwt: null,
  user: null,
  deviceInfo: null,

  validate_token_loading: false,
  validate_token_error: null,

  signin_loading: false,
  signin_message: null,
  signin_error: null,

  signup_loading: false,
  signup_message: null,
  signup_error: null,

  update_self_loading: false,
  update_self_message: null,
  update_self_error: null,
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.CHECK_AUTH:
      return {
        ...state,
        isLogined: action.isLogined,
        jwt: action.token,
        deviceInfo: action.deviceInfo
      }
    //SIGN-IN
    case userConstants.SIGNIN_REQUEST:
      return {
        ...state,
        isLogined: false,
        signin_loading: true,
        signin_error: null,
      };
    case userConstants.SIGNIN_SUCCESS:
      return {
        ...state,
        isLogined: true,
        signin_loading: false,
        signin_error: null,
        jwt: action.user.jwt,
        user: action.user.user
      };
    case userConstants.SIGNIN_FAILURE:
      return {
        ...state,
        isLogined: false,
        signin_loading: false,
        signin_error: action.error,
      };

    //SIGN-UP
    case userConstants.SIGNUP_REQUEST:
      return {
        ...state,
        signup_loading: true,
        signup_error: null
      };
    case userConstants.SIGNUP_SUCCESS:
      return {
        ...state,
        signup_loading: false,
        signup_error: null,
        signup_message: action.message,
      };
    case userConstants.SIGNUP_FAILURE:
      return {
        ...state,
        signup_loading: false,
        signup_error: action.error,
      };

    //LOGOUT
    case userConstants.LOGOUT:
      return {
        ...state,
        isLogined: false,
        jwt: null,
        user: null
      };

    //UPDATE-USER
    case userConstants.USER_UPDATE_REQUEST:
      return {
        ...state,
        update_self_loading: true,
        update_self_message: null,
        update_self_error: null,
      };
    case userConstants.USER_UPDATE_SUCCESS:
      return {
        ...state,
        update_self_loading: false,
        update_self_error: null,
        update_self_message: action.message,
        user: action.user
      };
    case userConstants.USER_UPDATE_FAILURE:
      return {
        ...state,
        update_self_loading: false,
        update_self_message: null,
        update_self_error: action.error,
      };

    //VALIDATE-USER
    case userConstants.VALIDATE_TOKEN_REQUEST:
      return {
        ...state,
        validate_token_loading: true,
        user: action.user
      };
    case userConstants.VALIDATE_TOKEN_SUCCESS:
      return {
        ...state,
        validate_token_loading: false,
        jwt: action.user.jwt,
        user: action.user.user,
      };
    case userConstants.VALIDATE_TOKEN_FAILURE:
      return {
        ...state,
        validate_token_loading: false,
        isLogined: false
      };
    default:
      return state
  }

}