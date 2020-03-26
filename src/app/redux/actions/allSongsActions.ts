import {Dispatch} from 'redux';
import {
  updateMetadataForTrack,
  TrackMetadata,
  getTrack,
  remove,
} from 'react-native-track-player';
import fs from 'react-native-fs';

import {MSong} from '../../models/song.model';
import musicTypes from '../types/musicTypes';
import database from '../../database';
import favoritesTypes from '../types/favoritesTypes';
import playlistTypes from '../types/playlistTypes';
import {PermissionsAndroid} from 'react-native';
import recentsTypes from '../types/recentsTypes';

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
      musicReducer: {listSongs, searchSongs},
      playlistReducer: {playlistSongs},
      favoritesReducer: {listFavorites},
      recentsReducer: {listRecents},
    } = getsState();

    dispatch({
      type: musicTypes.loadingFavorite,
    });

    const isFavorite = !current.isFavorite;

    const updateListRecents = listRecents.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, isFavorite};
      }

      return music;
    });

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

    const updateSearchSongs = searchSongs.map((music: MSong) => {
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

    dispatch({
      type: recentsTypes.updateRecents,
      payload: updateListRecents,
    });

    dispatch({
      type: musicTypes.getSearch,
      payload: updateSearchSongs,
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

/**
 * @description setea o modifica el estado favorito de una cancion
 * @param current cancion actual
 */
export const updateSong = (current: {
  id: string;
  title: string;
  author: string;
  album: string;
  cover: string;
  lyrics: string;
}) => async (dispatch: Dispatch, getsState: any) => {
  try {
    const {id, title, author, album, lyrics, cover} = current;
    const {
      musicReducer: {listSongs, searchSongs},
      playlistReducer: {playlistSongs},
      favoritesReducer: {listFavorites},
      recentsReducer: {listRecents},
    } = getsState();
    const {current: songCurrent} = getsState().musicReducer;

    dispatch({
      type: musicTypes.loadingUpdateSong,
    });

    const updateSongs = listSongs.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, title, author, album, lyrics, cover};
      }

      return music;
    });

    const updateSongsPlayList = playlistSongs.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, title, author, album, lyrics, cover};
      }

      return music;
    });

    var updateSongsFavorites = listFavorites.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, title, author, album, lyrics, cover};
      }

      return music;
    });

    var updateListRecents = listRecents.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, title, author, album, lyrics, cover};
      }

      return music;
    });

    const updateSearchSongs = searchSongs.map((music: MSong) => {
      if (music.id === current.id) {
        return {...music, title, author, album, lyrics, cover};
      }

      return music;
    });

    await database.updateSong(id, title, author, album, lyrics, cover);

    if (await getTrack(id)) {
      await updateMetadataForTrack(id, getTrackData(current));
    }

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

    dispatch({
      type: recentsTypes.updateRecents,
      payload: updateListRecents,
    });

    dispatch({
      type: musicTypes.getSearch,
      payload: updateSearchSongs,
    });

    if (current.id === songCurrent.id) {
      dispatch({
        type: musicTypes.updateCurrentMusic,
        payload: {...songCurrent, ...current},
      });
    }
  } catch (err) {
    console.log(err);
  }
};

/**
 * @description elimina la cancion seleccionada
 * @param song cancion actual
 */
export const deleteSong = (song: MSong) => async (
  dispatch: Dispatch,
  getsState: any,
) => {
  try {
    const {
      musicReducer: {listSongs, current},
      playlistReducer: {playlistSongs},
      favoritesReducer: {listFavorites},
    } = getsState();

    const hasExternalWritePermissions: boolean = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (!hasExternalWritePermissions) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Permitir escritura',
          message: 'Permitir que esta aplicación modifique sus archivos',
          buttonPositive: 'Permitir',
          buttonNegative: 'Rechazar',
        },
      );
    }

    if (current.id === song.id) {
      dispatch({
        type: musicTypes.errorDeleteSong,
        payload: {type: 1, message: 'current song'},
      });
      dispatch({
        type: musicTypes.errorDeleteSong,
        payload: null,
      });
      return;
    }

    dispatch({
      type: musicTypes.loadingDeleteSong,
    });

    const updateSongs = listSongs.filter(
      (music: MSong) => music.id !== song.id,
    );

    const updateSongsPlayList = playlistSongs.filter(
      (music: MSong) => music.id !== song.id,
    );

    var updateSongsFavorites = listFavorites.filter(
      (music: MSong) => music.id !== song.id,
    );

    const existFile = await fs.exists(song.path);

    if (existFile) {
      await fs.unlink('file:///' + song.path);
    }

    console.log(existFile);

    await database.deleteSong(song.id, song.path);

    if (await getTrack(song.id)) {
      remove(song.id);
    }

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
  } catch (err) {
    console.log(err);
    dispatch({
      type: musicTypes.errorDeleteSong,
      payload: err,
    });
    dispatch({
      type: musicTypes.errorDeleteSong,
      payload: null,
    });
  }
};

const getTrackData = ({title, author, album, cover}: any) => {
  return {
    artist: author,
    title,
    album: album,
    artwork: cover
      ? cover
      : require('../../../assets/images/music_notification.png'),
  } as TrackMetadata;
};
