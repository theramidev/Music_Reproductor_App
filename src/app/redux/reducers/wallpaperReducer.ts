import wallpaperTypes from '../types/wallpaperTypes';

const INITIAL_STATE = {
    data: {
        wallpappers: []
    },
    loadings: {},
    errors: {}
}

interface IAction {
    type: string;
    payload: any;
  }

export default (state = INITIAL_STATE, {type, payload}: IAction) => {
    switch(type) {
        case wallpaperTypes.getWallpapers:
            return {
                ...state,
                data: {...state.data, wallpapers: payload},
                loadings: {...state.loadings, loadingWallpapers: false}
            };
        
        case wallpaperTypes.loadingGetWalpapers:
            return {
                ...state,
                loadings: {...state.loadings, loadingGetWallpapers: false}
            };

        case wallpaperTypes.changeCurrentWallpaper:
            return {
                ...state,
                data: {...state.data, currentWallpaper: payload}
            }

        default:
            return state;
    }
}