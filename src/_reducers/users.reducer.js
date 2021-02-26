import { userConstants } from '../_constants';

const initialState =  {
  students: [],
  promouters: [],
  teathers: [],
  admins: []
}

export function users(state = initialState, action) {
  switch (action.type) {
    //USER_UPDATE_BY_ID
    case userConstants.USER_UPDATE_BY_ID_REQUEST:
      return {
        ...state,
        user_loading: true
      };
    case userConstants.USER_UPDATE_BY_ID_SUCCESS:
      var users = [state.students, state.promouters, state.teathers, state.admins];
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

    //DELETE USER
    case userConstants.USER_DELETE_REQUEST:
      return {
        ...state,
        user_loading: true
      };
    case userConstants.USER_DELETE_SUCCESS:
      var students = state.students.filter(u => u.id !== action.user_id)
      var promouters = state.promouters.filter(u => u.id !== action.user_id);
      var teathers = state.teathers.filter(u => u.id !== action.user_id);
      return {
        ...state,
        students: students,
        promouters: promouters,
        teathers: teathers,
        users: state.users
      };
    case userConstants.USER_DELETE_FAILURE:
      return {
        user_loading: false,
        error: action.error
      };

    //GETALL_USERS
    case userConstants.GETALL_USERS_REQUEST:
      return {
        ...state,
        user_loading: true
      };
    case userConstants.GETALL_USERS_SUCCESS:
      var students = [];
      var promouters = [];
      var teathers = [];
      for (let i = 0; i < action.users.users.length; i++) {
        switch (action.users.users[i].status) {
          case 'ИСКАТЕЛЬ':
            students.push(action.users.users[i])
            break;
          case 'УЧЕНИК':
            students.push(action.users.users[i])
            break;
          case 'ПРОМОУТЕР':
            promouters.push(action.users.users[i])
            break;
          case 'УЧИТЕЛЬ':
            teathers.push(action.users.users[i])
            break;

        }

      }
      return {
        user_loading: false,
        students: students,
        promouters: promouters,
        teathers: teathers,
        users: action.users.users
      };
    case userConstants.GETALL_USERS_FAILURE:
      return {
        user_error: action.error
      };

    //GETALL_TEATHERS
    case userConstants.GETALL_TEATHERS_REQUEST:
      return {
        ...state,
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
        ...state,
        loading: true
      };
    case userConstants.GETALL_STUDENTS_SUCCESS:
      return {
        loading: false,
        students: action.students.students
      };
    case userConstants.GETALL_STUDENTS_FAILURE:
      return {
        error: action.error
      };

    //GETALL_STUDENTS_BY_PROMOUTER
    case userConstants.GETALL_STUDENTS_BY_PROMOUTER_REQUEST:
      return {
        ...state,
        users_loading: true
      };
    case userConstants.GETALL_STUDENTS_BY_PROMOUTER_SUCCESS:
      return {
        users_loading: false,
        promouters: action.students.users
      };
    case userConstants.GETALL_STUDENTS_BY_PROMOUTER_FAILURE:
      return {
        users_error: action.error
      };

    //GETONE_USER
    case userConstants.GETONE_USER_REQUEST:
      return {
        ...state,
        users_loading: true
      };
    case userConstants.GETONE_USER_SUCCESS:
      return {
        users_loading: false,
        user_data: action.user
      };
    case userConstants.GETONE_USER_REQUEST:
      return {
        users_error: action.error
      };

    default:
      return state
  }


}