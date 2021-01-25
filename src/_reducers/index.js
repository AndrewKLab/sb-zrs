import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { style } from './styles.reducer';
import { categories } from './category.reducer';
import { course } from './course.reducer';
import { lesson } from './lesson.reducer';
import { search } from './search.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  style,
  categories,
  course,
  lesson,
  search
});

export default rootReducer;