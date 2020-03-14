import playlistTypes from '../types/playlistType';

const INITIAL_STATE = {
    data: {
        playlists: []
    },
    loadings: {},
    errors: {}
}

export default (state = INITIAL_STATE, {type, payload}: any) => {
    switch(type) {
        case playlistTypes.getPlaylists:
            return {
                ...state,
                data: {...state.data, playlists: payload},
                loadings: {...state.loadings, loadingPlaylists: false}
            }
        case playlistTypes.loadigGetPlaylists: 
            return {
                ...state,
                loadings: {...state.loadings, loadingPlaylists: true}
            }

        case playlistTypes.getCurrentPLaylist:
            return {
                ...state,
                data: {...state.data, currentPlaylist: payload}
            }
        
        case playlistTypes.cleanCurrentPlaylist:
            return {
                ...state,
                data: {...state.data, currentPLaylist: null}
            }
        
        default:
            return state;
    }
}