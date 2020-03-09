import {combineReducers} from 'redux';

import fileReducer from './fileReducer';
import musicReducer from './musicReducer';

export default combineReducers({
  fileReducer,
  musicReducer,
});
