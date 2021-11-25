import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { style } from './styles.reducer';
import { categories } from './category.reducer';
import { course } from './course.reducer';
import { lesson } from './lesson.reducer';
import { search } from './search.reducer';
import { chat } from './chat.reducer';
import { course_constructor } from './course_constructor.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  style,
  categories,
  course,
  lesson,
  search,
  chat,
  course_constructor
});

export default rootReducer;