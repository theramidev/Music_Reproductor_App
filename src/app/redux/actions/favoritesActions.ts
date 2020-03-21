import favoritesTypes from '../types/favoritesTypes';
import {Dispatch} from 'redux';
import {MSong} from '../../models/song.model';
import database from '../../database/index';

/**
 * @description obtiene el listado de las musicas favoritas
 */
export const getFavoriteSongs = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: favoritesTypes.loadingFavorites,
    });

    const favoriteSongs: MSong[] = await database.getFavoriteSongs();

    dispatch({
      type: favoritesTypes.updateListFavorites,
      payload: favoriteSongs,
    });
  } catch (err) {
    dispatch({
      type: favoritesTypes.errorFavorites,
      payload: err,
    });

    dispatch({
      type: favoritesTypes.errorFavorites,
      payload: null,
    });
  }
};
