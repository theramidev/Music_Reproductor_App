import {PermissionsAndroid} from 'react-native';
import {Dispatch} from 'redux';
import TrackPlayer, {Track} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import fs from 'react-native-fs';
// import * as MusicFilesV3 from 'react-native-get-music-files-v3dev-test';
import MusicFiles from 'react-native-get-music-files';

import {MSong, ISong} from '../../models/song.model';
import musicTypes from '../types/musicTypes';
import database from '../../database';
import {
  getListRamdonSong,
  getListLineSong,
} from '../../../utils/orderListMusic';

export const refreshListSong = () => async (dispatch: Dispatch) => {
  dispatch({
    type: musicTypes.loadingRefresh,
  });

  try {
    const songsDB: MSong[] = await database.getSongs();
    const allSongs = await MusicFiles.getAll({
      blured: true, // works only when 'cover' is set to true
      artist: true,
      duration: true, //default : true
      genre: true,
      title: true,
      cover: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
    });
    /* const {length, results: allSongs} = await MusicFilesV3.default.getAll({
      cover: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration
      batchSize: 0,
      batchNumber: 0,
      sortBy: MusicFilesV3.Constants.SortBy.Title.toString(),
      sortOrder: MusicFilesV3.Constants.SortOrder.Ascending.toString(),
    }); */

    const musicFiles = allSongs.filter((song: any) => {
      const [extension] = song.path.split('.').reverse();

      if (extension === 'ogg' || extension === 'opus' || extension === 'flac') {
        return false;
      }

      return true;
    });

    var newMusicFiles: ISong[] | any = musicFiles.map((song: ISong) => {
      const songDB: MSong | any = songsDB.find(
        songData => songData.id === song.id.toString(),
      );

      if (songDB) {
        return {
          ...songDB,
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
    console.error('[musicActions.ts ]: ', error);
  }
};

/**
 * @description Limipia el estado de buscar
 */
export const clearSearch = () => (dispatch: Dispatch) => {
  dispatch({
    type: musicTypes.clearSearch,
  });
};

/**
 * @description Busca una canción
 */
export const searchSong = (words: string) => async (dispatch: Dispatch) => {
  try {
    const songs = await database.searchSongs(words);

    dispatch({
      type: musicTypes.getSearch,
      payload: songs,
    });
  } catch (error) {
    console.error('Search Error: ', error);
  }
};

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

    // SONGS DB
    const songsDB: MSong[] = await database.getSongs();
    if (songsDB.length) {
      dispatch({
        type: musicTypes.updateListSongs,
        payload: songsDB,
      });
    }
    // console.log(songsDB);
    // obtiene la ultima cancion reproducida ==============
    const data = await AsyncStorage.getItem('@LastMusic');
    let last: MSong | null = data ? JSON.parse(data) : '';
    if (last) {
      if (!(await fs.exists(last.path))) {
        last = null;
      }
    }
    const lastMusic = songsDB[0] || {};

    dispatch({
      type: musicTypes.updateCurrentMusic,
      payload: last || lastMusic,
    });
    // =====================================================

    const allSongs = await MusicFiles.getAll({
      blured: true, // works only when 'cover' is set to true
      artist: true,
      duration: true, //default : true
      genre: true,
      title: true,
      cover: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
      coverFolder: `Android/data/com.musicdm/files/`
    });
    /* const {length, results: allSongs} = await MusicFilesV3.default.getAll({
      cover: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration
      batchSize: 0,
      batchNumber: 0,
      sortBy: MusicFilesV3.Constants.SortBy.Title.toString(),
      sortOrder: MusicFilesV3.Constants.SortOrder.Ascending.toString(),
      // coverFolder: `${fs.ExternalDirectoryPath}/covers`
    }); */

    // console.log(allSongs);

    let musicFiles = allSongs.filter((song: any) => {
      const [extension] = song.path.split('.').reverse();

      if (extension === 'ogg' || extension === 'opus' || extension === 'flac') {
        return false;
      }

      return true;
    });

    const newMusicFiles: ISong[] | any = musicFiles.map((song: ISong) => {
      const songDB: MSong | any = songsDB.find(
        songData => songData.id === song.id.toString(),
      );

      if (songDB) {
        return {
          ...songDB,
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
 * @description modifica el listdo de reproduccion de las canciones
 * @param song
 */
export const updateListSongsCurrent = (songs: MSong[]) => (
  dispatch: Dispatch,
) => {
  dispatch({
    type: musicTypes.updateListSongsCurrent,
    payload: songs,
  });
};

/**
 * @description modifica el modo de reproduccion
 * @param mode 'RANDOM' | 'LINE'
 */
export const updateMode = (mode: 'RANDOM' | 'LINE') => (dispatch: Dispatch) => {
  dispatch({
    type: musicTypes.updateMode,
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
    const {listSongsCurrent, current} = getsState().musicReducer;
    const listMusics: MSong[] = getListLineSong(listSongsCurrent);

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
    const {listSongsCurrent, current} = getsState().musicReducer;
    const auxListSongsCurrent = listSongsCurrent;
    
    const listMusics: MSong[] = getListRamdonSong(
      auxListSongsCurrent,
      null,
      current,
      );
      // console.log(songs.map(item => item.title));
      
      const tracks: Track[] = getList(listMusics);
      TrackPlayer.add(tracks);
      start && TrackPlayer.play();
      
      // const songs: MSong[] = await database.getSongs();
    dispatch({
      type: musicTypes.updateListSongs,
      payload: listSongsCurrent,
    });
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
      musicReducer: {listSongsCurrent, current},
    } = getsState();
    const listMusics: MSong[] = getListLineSong(listSongsCurrent, current);

    const tracks: Track[] = getList(listMusics);
    const elementsRemove = listSongsCurrent.filter(
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
      musicReducer: {listSongsCurrent, current},
    } = getsState();
    const auxListSongsCurrent = listSongsCurrent;

    const listMusics: MSong[] = getListRamdonSong(auxListSongsCurrent, current);

    const tracks: Track[] = getList(listMusics);

    const elementsRemove = listSongsCurrent.filter(
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
