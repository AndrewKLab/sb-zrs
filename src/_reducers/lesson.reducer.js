import { lessonConstants, courseConstants } from '../_constants';

export function lesson(state = [], action) {
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
      return {
        loading: false,
        data: action.data
      };
    case lessonConstants.GETALL_BY_COURSE_FAILURE:
      return {
        error: action.error
      };

    case courseConstants.CREATE_PASSED_COURSE:
      return {
        ...state,
        data: {
          ...state.data,
          passed_course_id: action.data.id,
          passed_course_status: action.data.status,
          assessment: action.data.assessment,
          start_time: action.data.start_time,
          finish_time: action.data.finish_time,
        }

      };

    case courseConstants.UPDATE_PASSED_COURSE:
      return {
        ...state,
        data: {
          ...state.data,
          passed_course_id: action.data.id,
          passed_course_status: action.data.status,
          assessment: action.data.assessment,
          start_time: action.data.start_time,
          finish_time: action.data.finish_time,
        }

      };

    case courseConstants.DELETE_PASSED_COURSE:
      return {
        ...state,
        data: {
          ...state.data,
          passed_course_id: null,
          passed_course_status: null,
          assessment: null,
          start_time: null,
          finish_time: null,
        }

      };

    default:
      return state
  }
}