import {PermissionsAndroid} from 'react-native';
import {Dispatch} from 'redux';
import MusicFiles from 'react-native-get-music-files';
import TrackPlayer, {Track} from 'react-native-track-player';

import {MSong, ISong} from '../../models/song.model';
import musicTypes from '../types/musicTypes';
import database from '../../database';
import {
  getListRamdonSong,
  getListLineSong,
} from '../../../utils/orderListMusic';
import AsyncStorage from '@react-native-community/async-storage';

/**
 * @description Obtiene las canciones del dispositivo
 */
export const getSongs = () => async (dispatch: Dispatch) => {
  try {
    dispatch({
      type: musicTypes.loadingListSongs,
    });
    const hasExternalReadPermissions: boolean = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    // Request Permissions
    if (!hasExternalReadPermissions) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permitir lectura',
          message: 'Permitir que esta aplicación lea sus archivos',
          buttonPositive: 'Permitir',
          buttonNegative: 'Rechazar',
        },
      );
    }

    const songsDB: MSong[] = await database.getSongs();

    // obtiene la ultima cancion reproducida ==============
    const data = await AsyncStorage.getItem('@LastMusic');
    const last = data ? JSON.parse(data) : '';
    const lastMusic = songsDB[0] || {};

    dispatch({
      type: musicTypes.updateCurrentMusic,
      payload: last || lastMusic,
    });
    // =====================================================

    dispatch({
      type: musicTypes.updateListSongs,
      payload: songsDB,
    });

    const musicFiles: ISong[] = await MusicFiles.getAll({
      id: true,
      blured: true,
      artist: true,
      duration: true,
      cover: true,
      genre: true,
      title: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration
    });

    const newMusicFiles: ISong[] | any = musicFiles.map(song => {
      const songDB: MSong | any = songsDB.find(
        songData => songData.id === song.id,
      );

      if (songDB) {
        return {
          ...song,
          isFavorite: songDB.isFavorite ? true : false,
        };
      }

      return song;
    });

    const songs: MSong[] = newMusicFiles.map((song: ISong) => new MSong(song));

    dispatch({
      type: musicTypes.updateListSongs,
      payload: songs,
    });
    await database.setSongs(musicFiles);
  } catch (error) {
    console.error(error);
  }
};

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

    AsyncStorage.setItem('@LastMusic', JSON.stringify(song));

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

/**
 * @description modifica el modo de reproduccion
 * @param mode 'RANDOM' | 'LINE'
 */
export const updateMode = (mode: 'RANDOM' | 'LINE') => (dispatch: Dispatch) => {
  dispatch({
    type: musicTypes.updateListSongs,
    payload: mode,
  });
};

/**
 * @description Comienza a reproducir una lista de canciones
 * @param start indica si se quiere iniciar la reproduccion
 */
export const playInLine = (start: boolean) => async (
  dispatch: Dispatch,
  getsState: any,
) => {
  try {
    const {listSongs, current} = getsState().musicReducer;
    const listMusics: MSong[] = getListLineSong(listSongs);

    const tracks = getList(listMusics);

    TrackPlayer.add(tracks);
    TrackPlayer.skip(current.id);
    start && TrackPlayer.play();
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

/**
 * @description inicia el listado de musica el aleatorio
 * @param start indica si se quiere iniciar la reproduccion
 */
export const playInRandom = (start: boolean) => async (
  dispatch: Dispatch,
  getsState: any,
) => {
  try {
    const {listSongs, current} = getsState().musicReducer;
    const listMusics: MSong[] = getListRamdonSong(listSongs, null, current);

    const tracks: Track[] = getList(listMusics);

    TrackPlayer.add(tracks);
    start && TrackPlayer.play();
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

/**
 * @description cambia el listado de reproduccion a seguido
 */
export const changeToLineMode = () => async (
  dispatch: Dispatch,
  getsState: any,
) => {
  try {
    const {
      musicReducer: {listSongs, current},
    } = getsState();
    const listMusics: MSong[] = getListLineSong(listSongs, current);

    const tracks: Track[] = getList(listMusics);
    const elementsRemove = listSongs.filter(
      (element: MSong) => element.id !== current.id,
    );

    await TrackPlayer.remove(
      elementsRemove.map((element: MSong) => element.id),
    );
    await TrackPlayer.add(tracks);
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

/**
 * @description cambia el listado de reproduccion a aleatorio
 */
export const changeToRandomMode = () => async (
  dispatch: Dispatch,
  getsState: any,
) => {
  try {
    const {
      musicReducer: {listSongs, current},
    } = getsState();

    const listMusics: MSong[] = getListRamdonSong(listSongs, current);

    const tracks: Track[] = getList(listMusics);

    const elementsRemove = listSongs.filter(
      (element: MSong) => element.id !== current.id,
    );

    await TrackPlayer.remove(
      elementsRemove.map((element: MSong) => element.id),
    );
    await TrackPlayer.add(tracks);
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

const getList = (listMusics: MSong[]) => {
  return listMusics.map(
    ({id, author, title, path, album, genre, duration, cover}) => {
      return {
        id,
        artist: author ? author : '',
        title,
        url: path,
        album: album ? album : 'Unknown',
        genre,
        artwork: cover
          ? cover
          : require('../../../assets/images/music_notification.png'),
        duration: duration,
        pitchAlgorithm: TrackPlayer.PITCH_ALGORITHM_MUSIC,
      } as Track;
    },
  );
};

/**
 * @description setea o modifica el estado favorito de una cancion
 */
export const updateFavorite = () => async (
  dispatch: Dispatch,
  getsState: any,
) => {
  try {
    const {
      musicReducer: {current, listSongs},
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

    await database.updateSongToFavorite(current.id, isFavorite);

    dispatch({
      type: musicTypes.updateListSongs,
      payload: updateSongs,
    });
    dispatch({
      type: musicTypes.updateCurrentMusic,
      payload: {...current, isFavorite},
    });
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
