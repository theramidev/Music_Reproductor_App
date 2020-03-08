import fileTypes from '../types/fileTypes';

const INITIAL_STATE = {
  data: {},
  loadings: {},
  errors: {},
};

interface IAction {
  type: string;
  payload: any;
}

export default (state = INITIAL_STATE, action: IAction) => {
  switch (action.type) {
    case fileTypes.getSongs:
      return {
        ...state,
        data: {...state.data, songs: action.payload},
        loadings: {...state.loadings, loadingSongs: false},
      };

    case fileTypes.loadingGetSongs:
      return {
        ...state,
        loadings: {...state.loadings, loadingSongs: true},
        errors: {...state.errors, errorSongs: null},
      };

    case fileTypes.errorGetSongs:
      return {
        ...state,
        loadings: {...state.loadings, loadingSongs: false},
        errors: {...state.errors, errorSongs: action.payload},
      };

    case fileTypes.getReproductions:
      return {
        ...state,
        data: {...state.data, reproductions: action.payload},
        loadings: {...state.loadings, loadingGetReproductions: false}
      }

    case fileTypes.loadingGetReproductions:
      return {
        ...state,
        loadings: {...state.loadings, loadingGetReproductions: true},
        errors: {...state.errors, errorGetReproductions: null}
      }

    case fileTypes.errorGetReproductions:
      return {
        ...state,
        loadings: {...state.loadings, loadingGetReproductions: false},
        errors: {...state.errors, errorGetReproductions: action.payload}
      }

    default:
      return state;
  }
};
