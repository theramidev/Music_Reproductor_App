import {Dispatch} from 'redux';
import {MSong} from '../../models/song.model';
import musicTypes from '../types/musicTypes';
import database from '../../database';
import favoritesTypes from '../types/favoritesTypes';
import playlistTypes from '../types/playlistTypes';

/**
 * @description setea o modifica el estado favorito de una cancion
 * @param current cancion actual
 */
export const updateFavorite = (
  current: MSong,
  updateCurrentPlaySong: boolean = false,
) => async (dispatch: Dispatch, getsState: any) => {
  try {
    const {
      musicReducer: {listSongs},
      playlistReducer: {playlistSongs},
      favoritesReducer: {listFavorites},
    } = getsState();

    dispatch({
      type: musicTypes.loadingFavorite,
    });

    const isFavorite = !current.isFavorite;

    const updateSongs = listSongs.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, isFavorite};
      }

      return music;
    });

    const updateSongsPlayList = playlistSongs.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, isFavorite};
      }

      return music;
    });

    var updateSongsFavorites: MSong[] = listFavorites;
    if (current.isFavorite) {
      updateSongsFavorites = listFavorites.filter(
        (music: MSong) => music.id !== current.id,
      );
    } else {
      updateSongsFavorites = [...listFavorites, current];
    }

    await database.updateSongToFavorite(current.id, isFavorite);

    dispatch({
      type: musicTypes.updateListSongs,
      payload: updateSongs,
    });

    dispatch({
      type: favoritesTypes.updateListFavorites,
      payload: updateSongsFavorites,
    });

    dispatch({
      type: playlistTypes.updatePlaylists,
      payload: updateSongsPlayList,
    });

    if (updateCurrentPlaySong) {
      dispatch({
        type: musicTypes.updateCurrentMusic,
        payload: {...current, isFavorite},
      });
    }
  } catch (err) {
    dispatch({
      type: musicTypes.errorFavorite,
      payload: err,
    });
    dispatch({
      type: musicTypes.errorFavorite,
      payload: null,
    });
  }
};
