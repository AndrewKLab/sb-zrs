import { lessonConstants, userConstants } from '../_constants';

const initialState = {
  users: [],

  students: [],
  promouters: [],
  teathers: [],
  coordinators: [],
  admins: [],

  user_roles_loading: false,
  user_roles: null,
  user_roles_error: null,

  selected_user: null,

  create_user_loading: false,
  create_user_message: null,
  create_user_error: null,

  update_user_loading: false,
  update_user_message: null,
  update_user_error: null,

  delete_user_loading: false,
  delete_user_message: null,
  delete_user_error: null,

  update_user_question_answer_loading: false,
  update_user_question_answer_message: null,
  update_user_question_answer_error: null,

  read_full_info_by_user_loading: false,
  read_full_info_by_user_message: null,
  read_full_info_by_user_error: null,

  check_passed_lesson_anwsers_loading: false,
  check_passed_lesson_anwsers_message: null,
  check_passed_lesson_anwsers_error: null,
}

const filterUser = (state, action) => {
  var users = {
    students: state.students,
    promouters: state.promouters,
    teathers: state.teathers,
    coordinators: state.coordinators,
    admins: state.admins
  };
  let user = state.users.find(user => user.id === action.user.id)
  if (user) {
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
              case 'Координатор':
                users = {
                  ...users,
                  coordinators: users.coordinators.map(user => user.id === action.user.id ? {
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
              case 'Супер Админ':
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
              case 'Координатор':
                var result = users.coordinators.filter(user => user.id !== action.user.id);
                users = {
                  ...users,
                  coordinators: result
                }
                break;
              case 'Администратор':
                var result = users.admins.filter(user => user.id !== action.user.id);
                users = {
                  ...users,
                  admins: result
                }
                break;
              case 'Супер Админ':
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
              case 'Координатор':
                var result = users.coordinators;
                result.push({
                  ...users_arr[i][j],
                  ...action.user
                })
                users = {
                  ...users,
                  coordinators: result
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
              case 'Супер Админ':
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
  } else {
    switch (action.user.role_name) {
      case 'Искатель':
        users = {
          ...users,
          students: [...users.students, action.user]
        }
        break;
      case 'Ученик':
        users = {
          ...users,
          students: [...users.students, action.user]
        }
        break;
      case 'Промоутер':
        users = {
          ...users,
          promouters: [...users.promouters, action.user]
        }
        break;
      case 'Учитель':
        users = {
          ...users,
          teathers: [...users.teathers, action.user]
        }
        break;
      case 'Координатор':
        users = {
          ...users,
          coordinators: [...users.coordinators, action.user]
        }
        break;
      case 'Администратор':
        users = {
          ...users,
          admins: [...users.admins, action.user]
        }
        break;
    }
  }
  return users;
}

export function users(state = initialState, action) {
  switch (action.type) {
    //CREATE_USER
    case userConstants.CREATE_USER_REQUEST:
      return {
        ...state,
        create_user_loading: true,
        create_user_message: null,
        create_user_error: null,
      };
    case userConstants.CREATE_USER_SUCCESS:
      var users = filterUser(state, action)
      return {
        ...state,
        create_user_loading: false,
        create_user_message: action.message,
        create_user_error: null,

        users: [...state.users, action.user],
        students: users.students,
        promouters: users.promouters,
        teathers: users.teathers,
        coordinators: users.coordinators,
        admins: users.admins
      };
    case userConstants.CREATE_USER_FAILURE:
      return {
        ...state,
        create_user_loading: false,
        create_user_message: null,
        create_user_error: action.error,
      };

    //USER_UPDATE_BY_ID
    case userConstants.USER_UPDATE_BY_ID_REQUEST:
      return {
        ...state,
        update_user_loading: true,
        update_user_message: null,
        update_user_error: null,
      };
    case userConstants.USER_UPDATE_BY_ID_SUCCESS:
      var users = filterUser(state, action)
      return {
        ...state,
        update_user_loading: false,
        update_user_message: null,
        update_user_error: null,

        selected_user: null,

        students: users.students,
        promouters: users.promouters,
        teathers: users.teathers,
        coordinators: users.coordinators,
        admins: users.admins
      };
    case userConstants.USER_UPDATE_BY_ID_FAILURE:
      return {
        ...state,
        update_user_loading: false,
        update_user_message: null,
        update_user_error: action.error,
      };

    //DELETE USER
    case userConstants.USER_DELETE_REQUEST:
      return {
        ...state,
        delete_user_loading: true,
        delete_user_message: null,
        delete_user_error: null,
      };
    case userConstants.USER_DELETE_SUCCESS:
      var students = state.students.filter(u => u.id !== action.user_id)
      var promouters = state.promouters.filter(u => u.id !== action.user_id);
      var teathers = state.teathers.filter(u => u.id !== action.user_id);
      var coordinators = state.coordinators.filter(u => u.id !== action.user_id);
      var admins = state.admins.filter(u => u.id !== action.user_id);
      return {
        ...state,
        delete_user_loading: false,
        delete_user_message: null,
        delete_user_error: null,

        selected_user: null,

        students: students,
        promouters: promouters,
        teathers: teathers,
        coordinators: coordinators,
        admins: admins,
        users: state.users,
      };
    case userConstants.USER_DELETE_FAILURE:
      return {
        ...state,
        delete_user_loading: false,
        delete_user_message: null,
        delete_user_error: action.error,
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
      var coordinators = [];
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
          case 'Координатор':
            coordinators.push(action.users.users[i])
            break;
          case 'Администратор':
            admins.push(action.users.users[i])
            break;
          case 'Супер Админ':
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
        coordinators: coordinators,
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
        users: action.students.students,
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

    //READ FULL INFO BY USER REQUEST
    case userConstants.READ_FULL_INFO_BY_USER_REQUEST:
      return {
        ...state,
        read_full_info_by_user_loading: true,
        read_full_info_by_user_message: null,
        read_full_info_by_user_error: null,
      };
    case userConstants.READ_FULL_INFO_BY_USER_SUCCESS:
      return {
        ...state,
        read_full_info_by_user_loading: false,
        read_full_info_by_user_message: null,
        read_full_info_by_user_error: null,

        selected_user: action.user
      };
    case userConstants.READ_FULL_INFO_BY_USER_FAILURE:
      return {
        ...state,
        read_full_info_by_user_loading: false,
        read_full_info_by_user_message: null,
        read_full_info_by_user_error: action.error,
      };

    //GET_USER_ROLES
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

    //GET_USER_ROLES
    case userConstants.UPDATE_USER_QUESTION_ANSWER_REQUEST:
      return {
        ...state,
        update_user_question_answer_loading: true,
        update_user_question_answer_message: null,
        update_user_question_answer_error: null,
      };
    case userConstants.UPDATE_USER_QUESTION_ANSWER_SUCCESS:
      return {
        ...state,
        update_user_question_answer_loading: false,
        update_user_question_answer_message: action.message,
        update_user_question_answer_error: null,

        selected_user: {
          ...state.selected_user,
          courses: state.selected_user.courses.map((course, index) => ({
            ...course,
            lessons: course.lessons.map((lesson, index) => ({
              ...lesson,
              questions: lesson.questions.map((question, index) => ({
                ...question,
                answers: question.answers.map((answer, index) => answer.uqa_id === action.answer.uqa_id ? { ...answer, ...action.answer } : answer)
              }))
            }))
          }))
        }
      };
    case userConstants.UPDATE_USER_QUESTION_ANSWER_FAILURE:
      return {
        ...state,
        update_user_question_answer_loading: false,
        update_user_question_answer_message: null,
        update_user_question_answer_error: action.error,
      };
    //CHECK_PASSED_LESSON_ANSWERS
    case lessonConstants.CHECK_PASSED_LESSON_ANSWERS_REQUEST:
      return {
        ...state,
        check_passed_lesson_anwsers_loading: true,
        check_passed_lesson_anwsers_message: null,
        check_passed_lesson_anwsers_error: null,
      };
    case lessonConstants.CHECK_PASSED_LESSON_ANSWERS_SUCCESS:
      return {
        ...state,
        check_passed_lesson_anwsers_loading: false,
        check_passed_lesson_anwsers_message: null,
        check_passed_lesson_anwsers_error: action.message,

        selected_user: {
          ...state.selected_user,
          courses: state.selected_user.courses.map((course, index) => ({
            ...course,
            lessons: course.lessons.map((lesson, index) => ( lesson.passed_lesson_id === action.lesson_passed.passed_lesson_id ? {...lesson, ...action.lesson_passed} : lesson))
          }))
        }
      };
    case lessonConstants.CHECK_PASSED_LESSON_ANSWERS_FAILURE:
      return {
        ...state,
        check_passed_lesson_anwsers_loading: false,
        check_passed_lesson_anwsers_message: null,
        check_passed_lesson_anwsers_error: action.error,
      };

    //SELECT_USER
    case userConstants.SELECT_USER:
      return {
        ...state,
        selected_user: action.user,
      };
    case userConstants.UPDATE_SELECTED_USER:
      return {
        ...state,
        selected_user: { ...state.user, ...action.user },
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