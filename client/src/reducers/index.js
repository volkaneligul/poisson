import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import statReducer from './statReducer';
import scheduleReducer from './scheduleReducer';
import profileReducer from './profileReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  stats: statReducer,
  schedule: scheduleReducer,
  profile: profileReducer
});
