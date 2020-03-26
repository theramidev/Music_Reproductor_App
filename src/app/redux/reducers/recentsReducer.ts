import recentsTypes from '../types/recentsTypes';

const INITIAL_STATE = {
  listRecents: [],
  loadingRecents: false,
  errorRecents: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case recentsTypes.updateRecents:
      return {
        ...state,
        listRecents: payload,
        loadingRecents: false,
      };

    case recentsTypes.loadingRecents:
      return {
        ...state,
        loadingRecents: true,
      };

    case recentsTypes.errorRecents:
      return {
        ...state,
        errorRecents: payload,
        loadingRecents: false,
      };

    default:
      return state;
  }
};
