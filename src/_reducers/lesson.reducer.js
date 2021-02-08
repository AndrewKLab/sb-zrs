import { lessonConstants, courseConstants } from '../_constants';

export function lesson(state = [], action) {
  switch (action.type) {
    // CREATE LESSON
    case lessonConstants.CREATE_LESSON_REQUEST:
      return {
        ...state,
        loading: true,
        lesson_error: undefined,
        data: state.data !== undefined ?
          {
            ...state.data,
            lessons: state.data.lessons !== undefined ? state.data.lessons : []
          } : {
            lessons: []
          }
      };
    case lessonConstants.CREATE_LESSON_SUCCESS:
      const { id, number, name, videolink, description, text } = action.data.lesson;
      var new_lessons_arr = state.data.lessons
      new_lessons_arr.push({ id, number, name, videolink, description, text })
      return {
        ...state,
        loading: false,
        lesson_error: undefined,
        message: action.data.message,
        data: {
          ...state.data,
          lessons: new_lessons_arr
        }
      };
    case lessonConstants.CREATE_LESSON_FAILURE:
      return {
        lesson_error: action.error,
        data: {
          ...state.data,
          lessons: state.data.lessons
        }
      };

    //DELETE COURSE
    case lessonConstants.DELETE_LESSON_REQUEST:
      return {
        ...state,
        loading: true,
        data: state.data
      };
    case lessonConstants.DELETE_LESSON_SUCCESS:
      console.log()
      return {
        loading: false,
        data: {
          ...state.data,
          lessons: state.data.lessons.filter(n => n.id !== action.lesson_id)
        }
      };
    case lessonConstants.DELETE_LESSON_FAILURE:
      return {
        ...state,
        data: state.data,
        error: action.error
      };

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
        lesson_error: action.error
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