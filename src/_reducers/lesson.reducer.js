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
          passed_course_id: action.id,
          passed_course_status: action.status,
          assessment: action.assessment,
          start_time: action.start_time,
          finish_time: action.finish_time,
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

    case lessonConstants.CREATE_PASSED_LESSON_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          lessons: state.data.lessons.map(item => item.id === action.data.lesson_id ?
              {
                ...item,
                passed_id: action.data.id,
                status: action.data.status,
                assessment: null,
                start_time: action.data.start_time,
                finish_time: null,
              } : item),
        }

      };

    case lessonConstants.UPDATE_PASSED_LESSON:
      return {
        ...state,
        data: {
          ...state.data,
          lessons:
            state.data.lessons.map(item => item.passed_id === action.passed_id ?
              {
                ...item,
                assessment: action.assessment,
                status: 'finished',
                finish_time: action.finish_time
              } : item),

        }

      };

    case lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE:
      return {
        ...state,
        data: {
          ...state.data,
          lessons:
            state.data.lessons.map(item => ({
              ...item,
              passed_id: null,
              assessment: null,
              status: null,
              start_time: null,
              finish_time: null
            })
            ),

        }

      };



    default:
      return state
  }
}