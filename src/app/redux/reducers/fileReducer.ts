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

    default:
      return state;
  }
};
