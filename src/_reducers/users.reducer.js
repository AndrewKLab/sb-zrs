import { userConstants } from '../_constants';

const initialState = {
  students: [],
  promouters: [],
  teathers: [],
  admins: [],

  user_roles_loading: false,
  user_roles: null,
  user_roles_error: null,

  selected_user: null

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
      var users = {
        students: state.students,
        promouters: state.promouters,
        teathers: state.teathers,
        admins: state.admins
      };
      var users_arr = Object.values(users);
      for (var i = 0; i < users_arr.length; i++) {
        for (var j = 0; j < users_arr[i].length; j++) {
          if (users_arr[i][j].id === action.user.id) {

            if (users_arr[i][j].role_name === action.user.role_name) {
              switch (action.user.role_name) {
                case 'Искатель':
                  users = {
                    ...users,
                    students: users.students.map(user => user.id === action.user.id ? {
                      ...user,
                      ...action.user
                    } : user)
                  }
                  break;
                case 'Ученик':
                  users = {
                    ...users,
                    students: users.students.map(user => user.id === action.user.id ? {
                      ...user,
                      ...action.user
                    } : user)
                  }
                  break;
                case 'Промоутер':
                  users = {
                    ...users,
                    promouters: users.promouters.map(user => user.id === action.user.id ? {
                      ...user,
                      ...action.user
                    } : user)
                  }
                  break;
                case 'Учитель':
                  users = {
                    ...users,
                    teathers: users.teathers.map(user => user.id === action.user.id ? {
                      ...user,
                      ...action.user
                    } : user)
                  }
                  break;
                case 'Администратор':
                  users = {
                    ...users,
                    admins: users.admins.map(user => user.id === action.user.id ? {
                      ...user,
                      ...action.user
                    } : user)
                  }
                  break;
              }
            } else {
              switch (users_arr[i][j].role_name) {
                case 'Искатель':
                  var result = users.students.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'Ученик':
                  var result = users.students.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'Промоутер':
                  var result = users.promouters.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    promouters: result
                  }
                  break;
                case 'Учитель':
                  var result = users.teathers.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    teathers: result
                  }
                  break;
                case 'Администратор':
                  var result = users.admins.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    admins: result
                  }
                  break;
              }
              switch (action.user.role_name) {
                case 'Искатель':
                  var result = users.students;
                  result.push({
                    ...users_arr[i][j],
                    ...action.user
                  })
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'Ученик':
                  var result = users.students;
                  result.push({
                    ...users_arr[i][j],
                    ...action.user
                  })
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'Промоутер':
                  var result = users.promouters;
                  result.push({
                    ...users_arr[i][j],
                    ...action.user
                  })
                  users = {
                    ...users,
                    promouters: result
                  }
                  break;
                case 'Учитель':
                  var result = users.teathers;
                  result.push({
                    ...users_arr[i][j],
                    ...action.user
                  })
                  users = {
                    ...users,
                    teathers: result
                  }
                  break;
                case 'Администратор':
                  var result = users.admins;
                  result.push({
                    ...users_arr[i][j],
                    ...action.user
                  })
                  users = {
                    ...users,
                    admins: result
                  }
                  break;
              }
            }
          } else {
            continue;
          }
        }
      }
      return {
        ...state,
        user_loading: false,
        students: users.students,
        promouters: users.promouters,
        teathers: users.teathers,
        admins: users.admins
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
      var admins = state.admins.filter(u => u.id !== action.user_id);
      return {
        ...state,
        students: students,
        promouters: promouters,
        teathers: teathers,
        admins: admins,
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
      var admins = []
      for (let i = 0; i < action.users.users.length; i++) {
        switch (action.users.users[i].role_name) {
          case 'Искатель':
            students.push(action.users.users[i])
            break;
          case 'Ученик':
            students.push(action.users.users[i])
            break;
          case 'Промоутер':
            promouters.push(action.users.users[i])
            break;
          case 'Учитель':
            teathers.push(action.users.users[i])
            break;
          case 'Администратор':
            admins.push(action.users.users[i])
            break;
        }

      }
      return {
        ...state,
        user_loading: false,
        students: students,
        promouters: promouters,
        teathers: teathers,
        admins: admins,
        users: action.users.users
      };
    case userConstants.GETALL_USERS_FAILURE:
      return {
        ...state,
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
        ...state,
        teathers: action.teathers.teathers
      };
    case userConstants.GETALL_TEATHERS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    //GETALL_STUDENTS
    case userConstants.GETALL_STUDENTS_REQUEST:
      return {
        ...state,
        user_loading: true
      };
    case userConstants.GETALL_STUDENTS_SUCCESS:
      var students = [];
      var promouters = [];
      for (let i = 0; i < action.students.students.length; i++) {
        switch (action.students.students[i].role_name) {
          case 'Искатель':
            students.push(action.students.students[i])
            break;
          case 'Ученик':
            students.push(action.students.students[i])
            break;
          case 'Промоутер':
            promouters.push(action.students.students[i])
            break;
        }
      }
      return {
        ...state,
        user_loading: false,
        students: students,
        promouters: promouters

      };
    case userConstants.GETALL_STUDENTS_FAILURE:
      return {
        ...state,
        error: action.error
      };

    //GETALL_STUDENTS_BY_PROMOUTER
    case userConstants.GETALL_STUDENTS_BY_PROMOUTER_REQUEST:
      return {
        ...state,
        users_loading: true
      };
    case userConstants.GETALL_STUDENTS_BY_PROMOUTER_SUCCESS:
      var students = [];
      var promouters = [];
      for (let i = 0; i < action.students.users.length; i++) {
        switch (action.students.users[i].role_name) {
          case 'Искатель':
            students.push(action.students.users[i])
            break;
          case 'Ученик':
            students.push(action.students.users[i])
            break;
          case 'Промоутер':
            promouters.push(action.students.users[i])
            break;
        }
      }
      return {
        ...state,
        user_loading: false,
        students: students,
        promouters: promouters

      };
    case userConstants.GETALL_STUDENTS_BY_PROMOUTER_FAILURE:
      return {
        ...state,
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
        ...state,
        users_loading: false,
        user_data: action.user
      };
    case userConstants.GETONE_USER_REQUEST:
      return {
        ...state,
        users_error: action.error
      };

    //GETONE_USER
    case userConstants.GET_USER_ROLES_REQUEST:
      return {
        ...state,
        user_roles_loading: true,
        user_roles_error: null,
      };
    case userConstants.GET_USER_ROLES_SUCCESS:
      return {
        ...state,
        user_roles_loading: false,
        user_roles: action.roles,
        user_roles_error: null,
      };
    case userConstants.GET_USER_ROLES_FAILURE:
      return {
        ...state,
        user_roles_loading: false,
        user_roles_error: action.error,
      };

    case userConstants.SELECT_USER:
      return {
        ...state,
        selected_user: action.user,
      };
    case userConstants.UPDATE_SELECTED_USER:
      return {
        ...state,
        selected_user: {...state.user, ...action.user},
      };
    case userConstants.CLEAN_SELECTED_USER:
      return {
        ...state,
        selected_user: null,
      };

    default:
      return state
  }


}