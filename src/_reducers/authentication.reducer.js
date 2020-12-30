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

    //UPDATE-USER
    case userConstants.USER_UPDATE_REQUEST:
      return {
        ...state,
        loading: true,
        jwt: action.jwt,
        user: {
          ...state.user,
          firstname: action.firstname,
          lastname: action.lastname,
          phonenumber: action.phonenumber,
          country: action.country,
          sity: action.sity,
          status: action.status,
          access: action.access,
          roles: action.roles,
          avatar: action.avatar,
          teather_id: action.teather_id
        }
      };
    case userConstants.USER_UPDATE_SUCCESS:
      return {
        loading: false,
        jwt: action.user.jwt,
        user: {
          ...state.user,
          firstname: action.user.firstname,
          lastname: action.user.lastname,
          phonenumber: action.user.phonenumber,
          country: action.user.country,
          sity: action.user.sity,
          status: action.user.status,
          access: action.user.access,
          roles: action.user.roles,
          avatar: action.user.avatar,
          teather_id: action.user.teather_id
        }
      };
    case userConstants.USER_UPDATE_FAILURE:
      return {};

    //VALIDATE-USER
    case userConstants.VALIDATE_REQUEST:
      return {
        loading: true,
        user: action.user
      };
    case userConstants.VALIDATE_SUCCESS:
      return {
        loading: false,
        jwt: action.user.jwt,
        user: action.user.user,
      };
    case userConstants.VALIDATE_FAILURE:
      return {};
  }
}