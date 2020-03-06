import {PermissionsAndroid, PermissionStatus} from 'react-native';
import fileTypes from '../types/fileTypes';
import {Dispatch} from 'redux';
import {ISong} from '../../models/song.model';
import TrackPlayer, {Track} from 'react-native-track-player';
import MusicFiles from 'react-native-get-music-files';

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
      const resp: PermissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Permitir lectura',
          message: 'Permitir que esta aplicación lea sus archivos',
          buttonPositive: 'Permitir',
          buttonNegative: 'Rechazar',
        },
      );

      if (resp === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Puedes leer archivos');
      }
    }

    const songs: ISong[] = await MusicFiles.getAll({
      id: true,
      blured: true,
      artist: true,
      duration: true,
      cover: true,
      genre: true,
      title: true,
      minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration
    });
    activateTrackPlayer(songs);
    dispatch({
      type: fileTypes.getSongs,
      payload: songs,
    });
  } catch (error) {
    console.error(error);
  }
};

export const activateTrackPlayer = async (songs: ISong[]) => {
  try {
    const tracks: Track[] = songs.map(
      ({id, author, title, path, album, genre, duration}) => {
        return {
          id,
          artist: author ? author : '',
          title,
          url: path,
          album: album ? album : 'Unknown',
          genre,
          artwork: require('../../../assets/images/music_notification.png'),
          duration: +duration,
          pitchAlgorithm: TrackPlayer.PITCH_ALGORITHM_MUSIC,
        } as Track;
      },
    );

    TrackPlayer.add(tracks);
    await TrackPlayer.play();
  } catch (error) {
    console.log('Error activateTrackPlayer: ', error);
  }
};

export const getDuration = (durationInMilisecons: number): string => {
  const date: Date = new Date(durationInMilisecons);
  return `${date.getMinutes()}:${date.getSeconds()}`;
};
