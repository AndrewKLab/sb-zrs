import { userConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    //GETALL_TEATHERS
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

    //GETALL_STUDENTS
    case userConstants.GETALL_STUDENTS_REQUEST:
      return {
        loading: true
      };
    case userConstants.GETALL_STUDENTS_SUCCESS:
      return {
        loading: false,
        users_array: action.students.students
      };
    case userConstants.GETALL_STUDENTS_FAILURE:
      return {
        error: action.error
      };

    //USER_UPDATE_BY_ID
    case userConstants.USER_UPDATE_BY_ID_REQUEST:
      return {
        ...state,
        users_array: state.users_array
      };
    case userConstants.USER_UPDATE_BY_ID_SUCCESS:
      return {
        ...state,
        users_array: state.users_array.map(item => item.id === action.user.user_id ?
          {
            ...item,
            firstname: action.user.firstname,
            lastname: action.user.lastname,
            phonenumber: action.user.phonenumber,
            country: action.user.country,
            sity: action.user.sity,
            status: action.user.status,
            access: action.user.access,
            roles: action.user.roles,
            teather_id: action.user.teather_id,
            avatar: action.user.avatar
          } : item),
    };
    case userConstants.USER_UPDATE_BY_ID_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}