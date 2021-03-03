import { courseConstants } from '../_constants';

export function course(state = {}, action) {
  switch (action.type) {
    //CREATE COURSE
    case courseConstants.CREATE_COURSE_REQUEST:
      return {
        loading: true
      };
    case courseConstants.CREATE_COURSE_SUCCESS:
      return {
        loading: false,
        message: action.courses.message,
        course_data: action.courses.course,
      };
    case courseConstants.CREATE_COURSE_FAILURE:
      return {
        course_error: action.error,
        message: undefined
      };

    //UPDATE COURSE
    case courseConstants.UPDATE_COURSE_REQUEST:
      return {
        ...state,
        loading: true
      };
    case courseConstants.UPDATE_COURSE_SUCCESS:
      var name;
      var value;
      if (state.courses !== undefined) {
        name = 'courses';
        var category_item = [];
        var courses_new = {};
        var category_valuses = Object.values(state.courses);
        var category_keys = Object.keys(state.courses);
        for (let i = 0; i < category_valuses.length; i++) {
          category_item = category_valuses[i].map((course) => course.id === action.course_id ? {
            id: action.course_id,
            category_name: action.category_name,
            description: action.description,
            img: action.img,
            name: action.name,
            autor_id: action.autor_id,
            published: action.published
          } : course)
          if (category_item.length > 0) {
            courses_new[category_keys[i]] = category_item;
          }
        }

        value = courses_new;
      } else {
        name = 'course_data'
        value = {
          id: action.course_id,
          category_name: action.category_name,
          description: action.description,
          img: action.img,
          name: action.name,
          autor_id: action.autor_id,
          published: action.published
        }
      }
      return {
        ...state,
        loading: false,
        message: action.courses.message,
        [name]: value
      };
    case courseConstants.UPDATE_COURSE_FAILURE:
      return {
        ...state,
        error: action.error,
        message: undefined
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
    //GETALL BY AUTOR
    case courseConstants.GETALL_BY_AUTOR_REQUEST:
      return {
        loading: true
      };
    case courseConstants.GETALL_BY_AUTOR_SUCCESS:
      return {
        loading: false,
        courses: action.courses,
      };
    case courseConstants.GETALL_BY_AUTOR_FAILURE:
      return {
        course_error: action.error
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