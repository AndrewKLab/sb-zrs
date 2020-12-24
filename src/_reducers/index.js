import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { style } from './styles.reducer';
import { categories } from './category.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  style,
  categories
});

export default rootReducer;