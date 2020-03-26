import {combineReducers} from 'redux';

import recentsReducer from './recentsReducer';
import musicReducer from './musicReducer';
import wallpaperReducer from './wallpaperReducer';
import playlistReducer from './playlistReducer';
import favoritesReducer from './favoritesReducer';

export default combineReducers({
  recentsReducer,
  musicReducer,
  wallpaperReducer,
  playlistReducer,
  favoritesReducer,
});
