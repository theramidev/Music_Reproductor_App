import { combineReducers } from 'redux';

import fileReducer from './fileReducer';
import wallpaperReducer from './wallpaperReducer';

export default combineReducers({
    fileReducer,
    wallpaperReducer
});