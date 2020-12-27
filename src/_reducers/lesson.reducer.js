import { lessonConstants } from '../_constants';

export function lesson(state = {}, action) {
  switch (action.type) {
    //GET ONE CATEGORY BY CATEGORY
    case lessonConstants.GETALL_BY_COURSE_REQUEST:   
      return {
        loading: true,
        course_id: action.course_id,
        user_id: action.user_id,
        teather_id: action.teather_id
      };
    case lessonConstants.GETALL_BY_COURSE_SUCCESS:
        console.log(action)
      return {
        loading: false,
        data: action.data
      };
    case lessonConstants.GETALL_BY_COURSE_FAILURE:
      return {
        error: action.error
      };
    default:
      return state
  }
}