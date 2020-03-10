import {MSong} from '../../models/song.model';
import {Dispatch} from 'redux';
import musicTypes from '../types/musicTypes';
import database from '../../database';

/**
 * @description modifica la cancion que esta actualmente seleccionada
 * @param song
 */
export const updateCurrentMusic = (song: MSong) => (dispatch: Dispatch) => {
  dispatch({
    type: musicTypes.updateCurrentMusic,
    payload: song,
  });
};

/**
 * @description modifica la cancion que esta actualmente seleccionada por su id
 * @param song
 */
export const updateCurrentMusicForId = (id: string) => async (
  dispatch: Dispatch,
) => {
  try {
    dispatch({
      type: musicTypes.loadingUpdateMusic,
    });

    const song = await database.getSongById(id);

    dispatch({
      type: musicTypes.updateCurrentMusic,
      payload: song,
    });
  } catch (err) {
    dispatch({
      type: musicTypes.updateCurrentMusic,
      payload: err,
    });
  }
};

/**
 * @description modifica la lista de canciones que se reproduciran
 * @param song
 */
export const updateListSongs = (songs: MSong[]) => (dispatch: Dispatch) => {
  dispatch({
    type: musicTypes.updateListSongs,
    payload: songs,
  });
};
