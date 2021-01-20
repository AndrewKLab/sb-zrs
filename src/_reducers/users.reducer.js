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
        students: action.students.students
      };
    case userConstants.GETALL_STUDENTS_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}