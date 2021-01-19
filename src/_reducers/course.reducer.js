import { courseConstants } from '../_constants';

export function course(state = {}, action) {
  switch (action.type) {
    //GET ONE CATEGORY BY CATEGORY
    case courseConstants.GETALL_BY_CATEGORY_REQUEST:
      return {
        loading: true
      };
    case courseConstants.GETALL_BY_CATEGORY_SUCCESS:
      return {
        loading: false,
        courses: action.courses.courses,
      };
    case courseConstants.GETALL_BY_CATEGORY_FAILURE:
      return {
        error: action.error
      };
    //GET_ALL_PASSED_COURSE_BY_USER_REQUEST
    case courseConstants.GET_ALL_PASSED_COURSE_BY_USER_REQUEST:
      return {
        loading: true
      };
    case courseConstants.GET_ALL_PASSED_COURSE_BY_USER_SUCCESS:
      return {
        loading: false,
        courses: action.courses,
      };
    case courseConstants.GET_ALL_PASSED_COURSE_BY_USER_FAILURE:
      return {
        error: action.error
      };

    default:
      return state
  }
}