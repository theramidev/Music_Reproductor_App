import TrackPlayer from 'react-native-track-player';
import {EmitterSubscription} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
var pass: number = 0;

export const PlaybackService = (
  updateMusic: any,
  changeToRandomMode: any,
  changeToLineMode: any,
) => {
  var remotePlay: EmitterSubscription | any;
  var remotePause: EmitterSubscription | any;
  var remoteNext: EmitterSubscription | any;
  var remotePrevious: EmitterSubscription | any;
  var playbackTrackChanged: EmitterSubscription | any;
  var playbackQueueEnded: EmitterSubscription | any;
  var remoteStop: EmitterSubscription | any;
  var playbackError: EmitterSubscription | any;

  const initEvents = () => {
    TrackPlayer.registerPlaybackService(() => async () => {
      if (pass > 0) {
        return;
      }
      pass++;
      remotePlay = TrackPlayer.addEventListener('remote-play', () => {
        // console.log('Remote Play: ', data);
        TrackPlayer.play();
      });
      remotePause = TrackPlayer.addEventListener('remote-pause', () => {
        //console.log('Remote Pause: ', data);
        TrackPlayer.pause();
      });
      remoteNext = TrackPlayer.addEventListener('remote-next', async () => {
        try {
          await TrackPlayer.skipToNext();
        } catch (err) {
          if (err.toString() === 'Error: There is no tracks left to play') {
            const data = await AsyncStorage.getItem('@Mode');
            const mode = data || 'RANDOM';
            if (mode === 'RANDOM') {
              await changeToRandomMode();
            } else {
              await changeToLineMode();
            }

            await TrackPlayer.skipToNext();
          }
        }
      });
      remotePrevious = TrackPlayer.addEventListener(
        'remote-previous',
        async (data: any) => {
          console.log('Remote Provious: ', data);
          try {
            await TrackPlayer.skipToPrevious();
          } catch (err) {
            if (err.toString() === 'Error: There is no previous track') {
              const songs = await TrackPlayer.getQueue();
              TrackPlayer.skip(songs[songs.length - 1].id);
            }
          }
        },
      );
      playbackTrackChanged = TrackPlayer.addEventListener(
        'playback-track-changed',
        async (data: any) => {
          console.log('playback-track-changed: ', data);
          // const id: string = await getCurrentTrack();
          // cuando se cambia de cancion se ejecutara esta funcion
          // que cabiara el estado a la cancion actual
          if (data.track && data.nextTrack) {
            const currentTrack = await TrackPlayer.getTrack(data.nextTrack);
            if (currentTrack) {
              updateMusic(data.nextTrack);
            }
          }
        },
      );
      playbackQueueEnded = TrackPlayer.addEventListener(
        'playback-queue-ended',
        async (data: any) => {
          if (data.track) {
            const dataStorage = await AsyncStorage.getItem('@Mode');
            const mode = dataStorage || 'RANDOM';
            if (mode === 'RANDOM') {
              await changeToRandomMode();
              await TrackPlayer.skipToNext();
            } else {
              const songs = await TrackPlayer.getQueue();
              TrackPlayer.skip(songs[0].id);
            }
          }
        },
      );
      remoteStop = TrackPlayer.addEventListener('remote-stop', () => {
        TrackPlayer.destroy();
      });
      playbackError = TrackPlayer.addEventListener(
        'playback-error',
        (data: any) => {
          console.log('Error playback-error (service.ts) :', data);
        },
      );
    });
  };

  const cleanEvents = () => {
    remotePlay.remove();
    remotePause.remove();
    remoteNext.remove();
    remotePrevious.remove();
    playbackTrackChanged.remove();
    playbackQueueEnded.remove();
    remoteStop.remove();
    playbackError.remove();
  };

  return [initEvents, cleanEvents];
};
