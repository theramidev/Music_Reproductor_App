import musicTypes from '../types/musicTypes';

const INITIAL_STATE = {
  current: {},
  loading: false,
  error: null,
};

export default (state = INITIAL_STATE, {type, payload}: any) => {
  switch (type) {
    case musicTypes.updateCurrentMusic:
      return {
        ...state,
        current: payload,
        loading: false,
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

    default:
      return state;
  }
};
