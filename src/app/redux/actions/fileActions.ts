import fileTypes from '../types/fileTypes';
import {Dispatch} from 'redux';
import {MSong} from '../../models/song.model';
import Database from '../../database';
import {MReproduction} from '../../models/reproduction.model';

/**
 * @description Obtiene las canciones favoritas
 */
export const getFavoriteSongs = () => async (dispatch: Dispatch) => {
  dispatch({
    type: fileTypes.loadingGetFavorite,
  });

  try {
    const favoriteSongs: MSong[] = await Database.getFavoriteSongs();

    dispatch({
      type: fileTypes.getFavorites,
      payload: favoriteSongs,
    });
  } catch (error) {
    console.error('getFavoriteSongs Error: ', error);
  }
};

/**
 * @description Obtiene las canciones escuchadas recientemente
 */
export const getRecents = () => async (dispatch: Dispatch) => {
  dispatch({
    type: fileTypes.loadingGetReproductions,
  });

  try {
    const reproductions: MReproduction[] = await Database.getReproductions();

    dispatch({
      type: fileTypes.getReproductions,
      payload: reproductions,
    });
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Agrega una canción a la lista de recientes
 * @param song Canción que se va a agregar a la lista
 */
export const setSongToRecent = (song: MSong) => async () => {
  try {
    await Database.setReproduction(song.id);
  } catch (error) {
    console.error(error);
  }
};
