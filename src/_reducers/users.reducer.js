import { userConstants } from '../_constants';

const initialState = {
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

            if (users_arr[i][j].status === action.user.status) {
              switch (action.user.status) {
                case 'ИСКАТЕЛЬ':
                  users = {
                    ...users,
                    students: users.students.map(user => user.id === action.user.id ? {
                      ...user,
                      id: action.user.id,
                      firstname: action.user.firstname,
                      lastname: action.user.lastname,
                      phonenumber: action.user.phonenumber,
                      country: action.user.country,
                      sity: action.user.sity,
                      status: action.user.status,
                      access: action.user.access,
                      roles: action.user.roles,
                      admin_id: action.user.admin_id,
                      teather: action.user.teather,
                      avatar: action.user.avatar,
                      promouter_id: action.user.promouter_id
                    } : user)
                  }
                  break;
                case 'УЧЕНИК':
                  users = {
                    ...users,
                    students: users.students.map(user => user.id === action.user.id ? {
                      ...user,
                      id: action.user.id,
                      firstname: action.user.firstname,
                      lastname: action.user.lastname,
                      phonenumber: action.user.phonenumber,
                      country: action.user.country,
                      sity: action.user.sity,
                      status: action.user.status,
                      access: action.user.access,
                      roles: action.user.roles,
                      admin_id: action.user.admin_id,
                      teather: action.user.teather,
                      avatar: action.user.avatar,
                      promouter_id: action.user.promouter_id
                    } : user)
                  }
                  break;
                case 'ПРОМОУТЕР':
                  users = {
                    ...users,
                    promouters: users.promouters.map(user => user.id === action.user.id ? {
                      ...user,
                      id: action.user.id,
                      firstname: action.user.firstname,
                      lastname: action.user.lastname,
                      phonenumber: action.user.phonenumber,
                      country: action.user.country,
                      sity: action.user.sity,
                      status: action.user.status,
                      access: action.user.access,
                      roles: action.user.roles,
                      admin_id: action.user.admin_id,
                      teather: action.user.teather,
                      avatar: action.user.avatar,
                      promouter_id: action.user.promouter_id
                    } : user)
                  }
                  break;
                case 'УЧИТЕЛЬ':
                  users = {
                    ...users,
                    teathers: users.teathers.map(user => user.id === action.user.id ? {
                      ...user,
                      id: action.user.id,
                      firstname: action.user.firstname,
                      lastname: action.user.lastname,
                      phonenumber: action.user.phonenumber,
                      country: action.user.country,
                      sity: action.user.sity,
                      status: action.user.status,
                      access: action.user.access,
                      roles: action.user.roles,
                      admin_id: action.user.admin_id,
                      teather: action.user.teather,
                      avatar: action.user.avatar,
                      promouter_id: action.user.promouter_id
                    } : user)
                  }
                  break;
                case 'admin':
                  users = {
                    ...users,
                    admins: users.admins.map(user => user.id === action.user.id ? {
                      ...user,
                      id: action.user.id,
                      firstname: action.user.firstname,
                      lastname: action.user.lastname,
                      phonenumber: action.user.phonenumber,
                      country: action.user.country,
                      sity: action.user.sity,
                      status: action.user.status,
                      access: action.user.access,
                      roles: action.user.roles,
                      admin_id: action.user.admin_id,
                      teather: action.user.teather,
                      avatar: action.user.avatar,
                      promouter_id: action.user.promouter_id
                    } : user)
                  }
                  break;
              }
            } else {
              switch (users_arr[i][j].status) {
                case 'ИСКАТЕЛЬ':
                  var result = users.students.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'УЧЕНИК':
                  var result = users.students.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'ПРОМОУТЕР':
                  var result = users.promouters.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    promouters: result
                  }
                  break;
                case 'УЧИТЕЛЬ':
                  var result = users.teathers.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    teathers: result
                  }
                  break;
                case 'admin':
                  var result = users.admins.filter(user => user.id !== action.user.id);
                  users = {
                    ...users,
                    admins: result
                  }
                  break;
              }
              switch (action.user.status) {
                case 'ИСКАТЕЛЬ':
                  var result = users.students;
                  result.push({
                    ...users_arr[i][j],
                    id: action.user.id,
                    firstname: action.user.firstname,
                    lastname: action.user.lastname,
                    phonenumber: action.user.phonenumber,
                    country: action.user.country,
                    sity: action.user.sity,
                    status: action.user.status,
                    access: action.user.access,
                    roles: action.user.roles,
                    admin_id: action.user.admin_id,
                    teather: action.user.teather,
                    avatar: action.user.avatar,
                    promouter_id: action.user.promouter_id
                  })
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'УЧЕНИК':
                  var result = users.students;
                  result.push({
                    ...users_arr[i][j],
                    id: action.user.id,
                    firstname: action.user.firstname,
                    lastname: action.user.lastname,
                    phonenumber: action.user.phonenumber,
                    country: action.user.country,
                    sity: action.user.sity,
                    status: action.user.status,
                    access: action.user.access,
                    roles: action.user.roles,
                    admin_id: action.user.admin_id,
                    teather: action.user.teather,
                    avatar: action.user.avatar,
                    promouter_id: action.user.promouter_id
                  })
                  users = {
                    ...users,
                    students: result
                  }
                  break;
                case 'ПРОМОУТЕР':
                  var result = users.promouters;
                  result.push({
                    ...users_arr[i][j],
                    id: action.user.id,
                    firstname: action.user.firstname,
                    lastname: action.user.lastname,
                    phonenumber: action.user.phonenumber,
                    country: action.user.country,
                    sity: action.user.sity,
                    status: action.user.status,
                    access: action.user.access,
                    roles: action.user.roles,
                    admin_id: action.user.admin_id,
                    teather: action.user.teather,
                    avatar: action.user.avatar,
                    promouter_id: action.user.promouter_id
                  })
                  users = {
                    ...users,
                    promouters: result
                  }
                  break;
                case 'УЧИТЕЛЬ':
                  var result = users.teathers;
                  result.push({
                    ...users_arr[i][j],
                    id: action.user.id,
                    firstname: action.user.firstname,
                    lastname: action.user.lastname,
                    phonenumber: action.user.phonenumber,
                    country: action.user.country,
                    sity: action.user.sity,
                    status: action.user.status,
                    access: action.user.access,
                    roles: action.user.roles,
                    admin_id: action.user.admin_id,
                    teather: action.user.teather,
                    avatar: action.user.avatar,
                    promouter_id: action.user.promouter_id
                  })
                  users = {
                    ...users,
                    teathers: result
                  }
                  break;
                  case 'admin':
                    var result = users.admins;
                    result.push({
                      ...users_arr[i][j],
                      id: action.user.id,
                      firstname: action.user.firstname,
                      lastname: action.user.lastname,
                      phonenumber: action.user.phonenumber,
                      country: action.user.country,
                      sity: action.user.sity,
                      status: action.user.status,
                      access: action.user.access,
                      roles: action.user.roles,
                      admin_id: action.user.admin_id,
                      teather: action.user.teather,
                      avatar: action.user.avatar,
                      promouter_id: action.user.promouter_id
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
          case 'admin':
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
        switch (action.students.students[i].status) {
          case 'ИСКАТЕЛЬ':
            students.push(action.students.students[i])
            break;
          case 'УЧЕНИК':
            students.push(action.students.students[i])
            break;
          case 'ПРОМОУТЕР':
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
        ...state,
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