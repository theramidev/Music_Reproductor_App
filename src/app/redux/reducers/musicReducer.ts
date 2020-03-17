import musicTypes from '../types/musicTypes';

const INITIAL_STATE = {
  listSongs: [],
  listSongsCurrent: [],
  loadingListSongs: true,
  errorListSongs: null,

  current: {},
  mode: 'RANDOM',
  loading: false,
  error: null,

  loadingFavorite: false,
  errorFavorite: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case musicTypes.updateListSongs:
      return {
        ...state,
        listSongs: payload,
        loadingListSongs: false,
      };
    case musicTypes.loadingListSongs:
      return {
        ...state,
        loadingListSongs: true,
      };
    case musicTypes.errorListSongs:
      return {
        ...state,
        loadingListSongs: false,
        errorListSongs: payload,
      };

    case musicTypes.updateListSongsCurrent:
      return {
        ...state,
        listSongsCurrent: payload,
      };

    case musicTypes.updateCurrentMusic:
      return {
        ...state,
        current: payload,
        loading: false,
        loadingFavorite: false,
      };
    case musicTypes.loadingUpdateMusic:
      return {
        ...state,
        loading: true,
      };
    case musicTypes.errorUpdateMusic:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case musicTypes.updateMode:
      return {
        ...state,
        mode: payload,
      };

    case musicTypes.loadingFavorite:
      return {
        ...state,
        loadingFavorite: true,
      };
    case musicTypes.errorFavorite:
      return {
        ...state,
        errorFavorite: payload,
        loadingFavorite: false,
      };

    default:
      return state;
  }
};
