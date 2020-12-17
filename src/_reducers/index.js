import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { style } from './styles.reducer';

const rootReducer = combineReducers({
  authentication,
  users,
  alert,
  style
});

export default rootReducer;