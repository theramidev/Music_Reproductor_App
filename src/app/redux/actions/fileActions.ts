import {PermissionsAndroid} from 'react-native';
import fileTypes from '../types/fileTypes';
import {Dispatch} from 'redux';
import {ISong, MSong} from '../../models/song.model';
import TrackPlayer, {Track} from 'react-native-track-player';
import MusicFiles from 'react-native-get-music-files';
import Database from '../../database';
import {MReproduction} from 'src/app/models/reproduction.model';

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

/**
 * @description Obtiene las canciones del dispositivo
 */
export const getSongs = () => async (dispatch: Dispatch) => {
  dispatch({
    type: fileTypes.loadingGetSongs,
  });

  try {
    const hasExternalReadPermissions: boolean = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );
    // Request Permissions
    if (!hasExternalReadPermissions) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const songsDB: MSong[] = await Database.getSongs();

    dispatch({
      type: fileTypes.getSongs,
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

    const songs: MSong[] = musicFiles.map(song => new MSong(song));
    dispatch({
      type: fileTypes.getSongs,
      payload: songs,
    });
    await Database.setSongs(musicFiles);
  } catch (error) {
    console.error(error);
  }
};

/**
 * @description Comienza a reproducir una lista de canciones
 * @param songs Lista de reproducción que va a ser reproducida
 */
export const activateTrackPlayer = (songs: MSong[]) => {
  try {
    const tracks: Track[] = songs.map(
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

    // console.log(tracks[25]);
    // console.log(tracks[32]);

    TrackPlayer.destroy();
    TrackPlayer.add(tracks);
    TrackPlayer.play();
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

/**
 * @description Obtiene la duración de una canción en formato mm:ss Ej: 4:13
 * @param durationInMilisecons Duración de la canción en milisegundos
 */
export const getDuration = (durationInMilisecons: number): string => {
  const date: Date = new Date(durationInMilisecons);
  return `${date.getMinutes()}:${date.getSeconds()}`;
};
