import fileTypes from '../types/recentsTypes';
import {Dispatch} from 'redux';
import {MSong} from '../../models/song.model';
import Database from '../../database';
import {MReproduction} from '../../models/reproduction.model';

/**
 * @description Obtiene las canciones escuchadas recientemente
 */
export const getRecents = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: fileTypes.loadingRecents,
    });
    const reproductions: MReproduction[] = await Database.getReproductions();
    const recents: any = reproductions.map((reproduction: MReproduction) => ({
      reproductionId: reproduction.reprodcutionId,
      createDate: reproduction.createDate,
      ...reproduction.song,
    }));
    dispatch({
      type: fileTypes.updateRecents,
      payload: recents,
    });
  } catch (err) {
    dispatch({
      type: fileTypes.errorRecents,
      payload: err,
    });
    dispatch({
      type: fileTypes.errorRecents,
      payload: null,
    });
  }
};

/**
 * @description Agrega una canción a la lista de recientes
 * @param songId id de la Canción que se va a agregar a la lista
 */
export const setSongToRecent = (songId: string) => async (
  dispatch: Dispatch,
  getState: any,
) => {
  try {
    await Database.setReproduction(songId);
    const reproductions: MReproduction[] = await Database.getReproductions();
    const updatedListRecents: any = reproductions.map(
      (reproduction: MReproduction) => ({
        reproductionId: reproduction.reprodcutionId,
        createDate: reproduction.createDate,
        ...reproduction.song,
      }),
    );

    dispatch({
      type: fileTypes.updateRecents,
      payload: updatedListRecents,
    });
  } catch (err) {
    dispatch({
      type: fileTypes.errorRecents,
      payload: err,
    });
    dispatch({
      type: fileTypes.errorRecents,
      payload: null,
    });
  }
};
