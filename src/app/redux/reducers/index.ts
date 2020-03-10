import {combineReducers} from 'redux';

import fileReducer from './fileReducer';
import musicReducer from './musicReducer';
import wallpaperReducer from './wallpaperReducer';

export default combineReducers({
  fileReducer,
  musicReducer,
  wallpaperReducer,
});
