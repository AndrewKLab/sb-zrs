import { lessonConstants, courseConstants, questionConstants } from '../_constants';

const initialState = {
  course: null,
  inprocess_lesson: null,

  get_by_course_loading: false,
  get_by_course_message: null,
  get_by_course_error: null,

  create_passed_course_loading: false,
  create_passed_course_message: null,
  create_passed_course_error: null,

  update_passed_course_loading: false,
  update_passed_course_message: null,
  update_passed_course_error: null,

  create_passed_lesson_loading: false,
  create_passed_lesson_message: null,
  create_passed_lesson_error: null,

  update_passed_lesson_loading: false,
  update_passed_lesson_message: null,
  update_passed_lesson_error: null,

  delete_all_passed_lessons_by_course_loading: false,
  delete_all_passed_lessons_by_course_message: null,
  delete_all_passed_lessons_by_course_error: null,

}

export function lesson(state = initialState, action) {
  switch (action.type) {
    //GETALL_BY_COURSE
    case lessonConstants.GETALL_BY_COURSE_REQUEST:
      return {
        ...state,
        get_by_course_loading: true,
        get_by_course_message: null,
        get_by_course_error: null,
      };
    case lessonConstants.GETALL_BY_COURSE_SUCCESS:
      return {
        ...state,
        get_by_course_loading: false,
        get_by_course_message: null,
        get_by_course_error: null,

        course: action.data
      };
    case lessonConstants.GETALL_BY_COURSE_FAILURE:
      return {
        get_by_course_loading: false,
        get_by_course_message: null,
        get_by_course_error: action.error,
      };

    case lessonConstants.SET_INPROCESS_LESSON:
      return {
        ...state,
        inprocess_lesson: action.lesson,
      };

    case courseConstants.CREATE_PASSED_COURSE_REQUEST:
      return {
        ...state,
        create_passed_course_loading: true,
        create_passed_course_message: null,
        create_passed_course_error: null,
      };
    case courseConstants.CREATE_PASSED_COURSE_SUCCESS:
      return {
        ...state,
        create_passed_course_loading: false,
        create_passed_course_message: action.message,
        update_passed_course_error: null,

        course: {
          ...state.course,
          ...action.course
        }
      };
    case courseConstants.CREATE_PASSED_COURSE_FAILURE:
      return {
        ...state,
        create_passed_course_loading: false,
        create_passed_course_message: null,
        create_passed_course_error: action.error,
      };

    case courseConstants.UPDATE_PASSED_COURSE_REQUEST:
      return {
        ...state,
        update_passed_course_loading: true,
        update_passed_course_message: null,
        update_passed_course_error: null,
      };
    case courseConstants.UPDATE_PASSED_COURSE_SUCCESS:
      return {
        ...state,
        update_passed_course_loading: false,
        update_passed_course_message: action.message,
        update_passed_course_error: null,

        course: {
          ...state.course,
          ...action.course
        }
      };
    case courseConstants.UPDATE_PASSED_COURSE_FAILURE:
      return {
        ...state,
        update_passed_course_loading: false,
        update_passed_course_message: null,
        update_passed_course_error: action.error,
      };

    case courseConstants.DELETE_PASSED_COURSE:
      return {
        ...state,
        course: {
          ...state.course,
          passed_course_id: null,
          passed_course_status: null,
          assessment: null,
          start_time: null,
          finish_time: null,
        }
      };

    case lessonConstants.CREATE_PASSED_LESSON_REQUEST:
      return {
        ...state,
        create_passed_lesson_loading: true,
        create_passed_lesson_message: null,
        create_passed_lesson_error: null,
      };
    case lessonConstants.CREATE_PASSED_LESSON_SUCCESS:
      return {
        ...state,
        create_passed_lesson_loading: false,
        create_passed_lesson_message: null,
        create_passed_lesson_error: null,

        course: {
          ...state.course,
          lessons: state.course.lessons.map(item => item.id === action.lesson.lesson_id ? {
            ...item,
            ...action.lesson
          } : item),
        },
        inprocess_lesson: {
          ...state.inprocess_lesson,
          ...action.lesson
        },
      };
    case lessonConstants.CREATE_PASSED_LESSON_FAILURE:
      return {
        ...state,
        create_passed_lesson_loading: false,
        create_passed_lesson_message: null,
        create_passed_lesson_error: action.error,
      };

    case lessonConstants.UPDATE_PASSED_LESSON_REQUEST:
      return {
        ...state,
        update_passed_lesson_loading: true,
        update_passed_lesson_message: null,
        update_passed_lesson_error: null,
      };
    case lessonConstants.UPDATE_PASSED_LESSON_SUCCESS:
      return {
        ...state,
        update_passed_lesson_loading: false,
        update_passed_lesson_message: action.message,
        update_passed_lesson_error: null,

        course: {
          ...state.course,
          lessons: state.course.lessons.map(item => item.passed_id === action.lesson.passed_id ? {
            ...item,
            ...action.lesson
          } : item),
        },
        inprocess_lesson: {
          ...state.inprocess_lesson,
          ...action.lesson
        },
      };
    case lessonConstants.UPDATE_PASSED_LESSON_FAILURE:
      return {
        ...state,
        update_passed_lesson_loading: false,
        update_passed_lesson_message: null,
        update_passed_lesson_error: action.error,
      };

    case lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE_REQUEST:
      return {
        ...state,
        delete_all_passed_lessons_by_course_loading: true,
        delete_all_passed_lessons_by_course_message: null,
        delete_all_passed_lessons_by_course_error: null,
      }
    case lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE_SUCCESS:
      return {
        ...state,
        delete_all_passed_lessons_by_course_loading: false,
        delete_all_passed_lessons_by_course_message: action.message,
        delete_all_passed_lessons_by_course_error: null,
        course: {
          ...state.course,
          lessons:
            state.course.lessons.map(item => ({
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
    case lessonConstants.DELETE_ALL_PASSED_LESSONS_BY_COURSE_FAILURE:
      return {
        ...state,
        delete_all_passed_lessons_by_course_loading: false,
        delete_all_passed_lessons_by_course_message: null,
        delete_all_passed_lessons_by_course_error: action.error,
      }

    //UPDATE QUESTION
    case questionConstants.UPDATE_QUESTION_REQUEST:
      return {
        ...state,
        data: state.data,
        question_loading: true
      };
    case questionConstants.UPDATE_QUESTION_SUCCESS:
      return {
        ...state,
        data: {
          ...state.data,
          lessons: state.data.lessons.map((lesson, index) => (
            lesson.id === action.lesson_id ? (
              {
                ...lesson,
                questions: lesson.questions.map((question, index) => (
                  question.id === action.question_id ?
                    {
                      ...question,
                      question: action.question,
                      question_type: action.question_type,
                    } : question))
              }
            ) : lesson
          ))
        },
        question_loading: false
      };
    case questionConstants.UPDATE_QUESTION_FAILURE:
      return {
        ...state,
        data: state.data,
        question_loading: false
      };



    case lessonConstants.CLEAR_MESSAGE_AND_ERROR:
      return {
        ...state,
        message: null,
        error: null
      };

    case lessonConstants.CLEAR_CREATED_LESSON_DATA:
      return []

    default:
      return state
  }

}