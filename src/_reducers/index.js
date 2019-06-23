import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
// add more reducer here.
const rootReducer = combineReducers({
  authentication,
  alert,

});

export default rootReducer;