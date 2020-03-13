import {Dispatch} from 'redux';

import {MSong} from '../../models/song.model';
import musicTypes from '../types/musicTypes';
import database from '../../database';
import TrackPlayer, {Track} from 'react-native-track-player';
import {
  getListRamdonSong,
  getListLineSong,
} from '../../../utils/orderListMusic';

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
 * @param songs Lista de reproducción que va a ser reproducida
 */
export const playInLine = (songs: MSong[], songSelected: MSong) => async () => {
  try {
    const listMusics: MSong[] = getListLineSong(songs);

    const tracks = getList(listMusics);
    // console.log(tracks[25]);
    // console.log(tracks[32]);

    TrackPlayer.add(tracks);
    TrackPlayer.skip(songSelected.id);
    TrackPlayer.play();
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

export const playInRandom = (
  songs: MSong[],
  songSelected?: MSong,
) => async () => {
  try {
    const listMusics: MSong[] = getListRamdonSong(songs, null, songSelected);

    const tracks: Track[] = getList(listMusics);

    TrackPlayer.add(tracks);
    TrackPlayer.play();
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

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
    await TrackPlayer.play();
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

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
    await TrackPlayer.play();
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
