import favoritesTypes from '../types/favoritesTypes';

const INITIAL_STATE = {
  listFavorites: [],
  loadingFavorites: false,
  errorFavorites: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case favoritesTypes.updateListFavorites:
      return {
        ...state,
        listFavorites: payload,
        loadingFavorites: false,
      };
    case favoritesTypes.loadingFavorites:
      return {
        ...state,
        loadingFavorites: true,
      };
    case favoritesTypes.errorFavorites:
      return {
        ...state,
        loadingFavorites: false,
        errorFavorites: payload,
      };

    default:
      return state;
  }
};
