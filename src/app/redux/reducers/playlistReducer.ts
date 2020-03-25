import playlistTypes from '../types/playlistTypes';

const INITIAL_STATE = {
  playlists: [],
  playlistSongs: [],
  currentPlaylist: null,

  loadingPlaylists: false,
  errors: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case playlistTypes.updatePlaylists:
      return {
        ...state,
        playlists: payload,
        loadingPlaylists: false,
      };
    case playlistTypes.loadigGetPlaylists:
      return {
        ...state,
        loadingPlaylists: false,
      };

    case playlistTypes.getCurrentPlaylist:
      return {
        ...state,
        currentPlaylist: payload,
      };

    case playlistTypes.cleanCurrentPlaylist:
      return {
        ...state,
        currentPLaylist: null,
      };

    case playlistTypes.getPlaylistSongs:
      return {
        ...state,
        playlistSongs: payload,
      };

    default:
      return state;
  }
};
