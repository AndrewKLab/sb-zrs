import { courseConstants, lessonConstants } from '../_constants';

const initialState = {
    course: null,

    course_loading: false,
    course_error: null,

    create_course_loading: false,
    create_course_success_message: null,
    create_course_error: null,

    update_course_loading: false,
    update_course_success_message: null,
    update_course_error: null,

    delete_course_loading: false,
    delete_course_success_message: null,
    delete_course_error: null,

    course_editing_status: 'create',
    lesson_editing_status: 'create',
    selected_lesson: null,

    //lesson

    delete_lesson_loading: false,
    delete_lesson_success_message: null,
    delete_lesson_error: null,
}

export function course_constructor(state = initialState, action) {
    switch (action.type) {
        //READ ONE COURSE BY ID (UPDATE COURSE)
        case courseConstants.GETONE_COURSE_BY_ID_REQUEST:
            return {
                ...state,
                course_loading: true,
                course_error: null,
            };
        case courseConstants.GETONE_COURSE_BY_ID_SUCCESS:
            return {
                ...state,
                course_loading: false,
                course_error: null,
                course: action.course,
                course_editing_status: 'update',

                update_course_success_message: null,
                update_course_error: null,
                delete_course_success_message: null,
                delete_course_error: null,
            };
        case courseConstants.GETONE_COURSE_BY_ID_FAILURE:
            return {
                ...state,
                course_loading: false,
                course_error: action.error,
            };
        //SET COURSE EDITING STATUS (CREATE COURSE)
        case courseConstants.SET_COURSE_EDITING_STATUS:
            return {
                ...state,
                course_editing_status: action.status
            };

        //CREATE COURSE
        case courseConstants.CREATE_COURSE_REQUEST:
            return {
                ...state,
                create_course_loading: true,
                create_course_success_message: null,
                create_course_error: null,
            };
        case courseConstants.CREATE_COURSE_SUCCESS:
            return {
                ...state,
                create_course_loading: false,
                create_course_success_message: action.courses.message,
                create_course_error: null,
                course_editing_status: 'update'
            };
        case courseConstants.CREATE_COURSE_FAILURE:
            return {
                ...state,
                create_course_loading: false,
                create_course_success_message: null,
                create_course_error: action.error,
            };

        //UPDATE COURSE
        case courseConstants.UPDATE_COURSE_REQUEST:
            return {
                ...state,
                update_course_loading: true,
                update_course_success_message: null,
                update_course_error: null
            };
        case courseConstants.UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                update_course_loading: false,
                update_course_success_message: action.courses.message,
                update_course_error: null
            };
        case courseConstants.UPDATE_COURSE_FAILURE:
            return {
                ...state,
                update_course_loading: false,
                update_course_success_message: null,
                update_course_error: action.error
            };

        //DELETE COURSE
        case courseConstants.DELETE_COURSE_REQUEST:
            return {
                ...state,
                loading: true,
                courses: state.courses
            };
        case courseConstants.DELETE_COURSE_SUCCESS:
            var category_item = [];
            var courses_new = {};
            var category_valuses = Object.values(state.courses);
            var category_keys = Object.keys(state.courses);
            for (let i = 0; i < category_keys.length; i++) {
                category_item = category_valuses[i].filter(n => n.id !== action.course_id);
                if (category_item.length > 0) {
                    courses_new[category_keys[i]] = category_item;
                }
            }
            return {
                loading: false,
                courses: courses_new
            };
        case courseConstants.DELETE_COURSE_FAILURE:
            return {
                ...state,
                courses: state.courses,
                error: action.error
            };

        //SET_LESSON_EDITING_STATUS (CREATE LESSON)
        case courseConstants.SET_LESSON_EDITING_STATUS:
            return {
                ...state,
                lesson_editing_status: action.status,
                selected_lesson: {},
            };

        //SELECT_LESSON (UPDATE LESSON)
        case courseConstants.SELECT_LESSON:
            return {
                ...state,
                selected_lesson: action.lesson,
                lesson_editing_status: 'update'
            }



        //DELETE LESSON
        case lessonConstants.DELETE_LESSON_REQUEST:
            return {
                ...state,
                delete_lesson_loading: true,
                delete_lesson_success_message: null,
                delete_lesson_error: null,
            };
        case lessonConstants.DELETE_LESSON_SUCCESS:
            return {
                delete_lesson_loading: false,
                delete_lesson_success_message: null,
                delete_lesson_error: null,
            };
        case lessonConstants.DELETE_LESSON_FAILURE:
            return {
                ...state,
                delete_lesson_loading: false,
                delete_lesson_success_message: null,
                delete_lesson_error: action.error,
            };



        default:
            return state
    }
}