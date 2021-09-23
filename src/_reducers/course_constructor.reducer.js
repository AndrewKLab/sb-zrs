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


    //lesson
    lesson_editing_status: 'create',
    selected_lesson_id: null,

    //create
    set_lesson_editing_data_loading: false,
    selected_lesson: null,
    set_lesson_editing_data_error: null,

    //update
    selected_lesson_loading: false,
    selected_lesson: null,
    selected_lesson_error: null,

    create_lesson_loading: false,
    create_lesson_success_message: null,
    create_lesson_error: null,

    update_lesson_loading: false,
    update_lesson_success_message: null,
    update_lesson_error: null,

    delete_lesson_loading: false,
    delete_lesson_success_message: null,
    delete_lesson_error: null,

    //test
    lesson_test_editing_status: false,

    selected_question: null
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

                selected_lesson_id: null,
                selected_lesson: null
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
                course_editing_status: action.status,
                selected_lesson_id: null,
                selected_lesson: null,
                course: null
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

        //LESSON PART

        //SET_LESSON_EDITING_STATUS (CREATE LESSON)
        case courseConstants.SET_LESSON_EDITING_STATUS:
            return {
                ...state,
                lesson_editing_status: action.status,
                selected_lesson_id: "",

            };

        case lessonConstants.SET_LESSON_EDITING_DATA_REQUEST:
            return {
                ...state,
                set_lesson_editing_data_loading: true,
                set_lesson_editing_data_error: null,
            };
        case lessonConstants.SET_LESSON_EDITING_DATA_SUCCESS:
            return {
                ...state,
                set_lesson_editing_data_loading: false,
                selected_lesson: "",
                set_lesson_editing_data_error: null,
            };
        case lessonConstants.SET_LESSON_EDITING_DATA_FAILURE:
            return {
                ...state,
                selected_lesson_loading: false,
                selected_lesson_error: null,
            };

        //SELECT_LESSON (UPDATE LESSON)
        case courseConstants.SELECT_LESSON:
            return {
                ...state,
                selected_lesson_id: action.lesson.lesson_id,
                lesson_editing_status: 'update'
            }

        //READ_ONE_LESSON
        case lessonConstants.READ_ONE_LESSON_BY_ID_REQUEST:
            return {
                ...state,
                selected_lesson_loading: true,
                selected_lesson_error: null,
            };
        case lessonConstants.READ_ONE_LESSON_BY_ID_SUCCESS:
            return {
                ...state,
                selected_lesson_loading: false,
                selected_lesson: action.lesson,
                lesson_test_editing_status: action.lesson.lesson_questions !== null,
                selected_lesson_error: null,
            };
        case lessonConstants.READ_ONE_LESSON_BY_ID_FAILURE:
            return {
                ...state,
                selected_lesson_loading: false,
                selected_lesson_error: null,
            };


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
                ...state,
                delete_lesson_loading: false,
                delete_lesson_success_message: action.data.message,
                course: { ...state.course, lessons: state.course.lessons.filter(l => l.lesson_id !== action.lesson_id) },
                delete_lesson_error: null,
            };
        case lessonConstants.DELETE_LESSON_FAILURE:
            return {
                ...state,
                delete_lesson_loading: false,
                delete_lesson_success_message: null,
                delete_lesson_error: action.error,
            };

        //LESON TEST
        case lessonConstants.CHANGE_LESSON_TEST_EDITING_STATUS:
            return {
                ...state,
                lesson_test_editing_status: action.status
            }

        case lessonConstants.SELECT_LESSON_TEST_QUESTION:
            return {
                ...state,
                selected_question: action.question 
            }
            


        default:
            return state
    }
}