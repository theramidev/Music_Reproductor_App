import {combineReducers} from 'redux';

import fileReducer from './fileReducer';
import musicReducer from './musicReducer';
import wallpaperReducer from './wallpaperReducer';
import playlistReducer from './playlistReducer';

export default combineReducers({
  fileReducer,
  musicReducer,
  wallpaperReducer,
  playlistReducer
});
