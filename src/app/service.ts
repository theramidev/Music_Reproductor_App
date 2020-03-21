/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  registerPlaybackService,
  addEventListener,
  EmitterSubscription,
  play,
  pause,
  skipToNext,
  skipToPrevious,
  getQueue,
  skip,
  getTrack,
  destroy,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import database from './database';
var pass: number = 0;

var remotePlay: EmitterSubscription | any;
var remotePause: EmitterSubscription | any;
var remoteNext: EmitterSubscription | any;
var remotePrevious: EmitterSubscription | any;
var playbackTrackChanged: EmitterSubscription | any;
var playbackQueueEnded: EmitterSubscription | any;
var remoteStop: EmitterSubscription | any;
var playbackError: EmitterSubscription | any;

export const PlaybackService = (
  updateMusic: any,
  changeToRandomMode: any,
  changeToLineMode: any,
) => {
  const initEvents = () => {
    registerPlaybackService(() => async () => {
      if (pass > 0) {
        return;
      }
      pass++;
      remotePlay = addEventListener('remote-play', () => {
        // console.log('Remote Play: ', data);
        play();
      });
      remotePause = addEventListener('remote-pause', () => {
        //console.log('Remote Pause: ', data);
        pause();
      });
      remoteNext = addEventListener('remote-next', async () => {
        console.log('next');
        try {
          await skipToNext();
        } catch (err) {
          if (err.toString() === 'Error: There is no tracks left to play') {
            const data = await AsyncStorage.getItem('@Mode');
            const mode = data || 'RANDOM';
            if (mode === 'RANDOM') {
              await changeToRandomMode();
            } else {
              await changeToLineMode();
            }

            await skipToNext();
          }
        }
      });
      remotePrevious = addEventListener(
        'remote-previous',
        async (data: any) => {
          console.log('Remote Provious: ', data);
          try {
            await skipToPrevious();
          } catch (err) {
            if (err.toString() === 'Error: There is no previous track') {
              const songs = await getQueue();
              skip(songs[songs.length - 1].id);
            }
          }
        },
      );
      playbackTrackChanged = addEventListener(
        'playback-track-changed',
        async (data: any) => {
          console.log('playback-track-changed: ', data);
          // const id: string = await getCurrentTrack();
          // cuando se cambia de cancion se ejecutara esta funcion
          // que cabiara el estado a la cancion actual
          if (data.track && data.nextTrack) {
            const currentTrack = await getTrack(data.nextTrack);
            if (currentTrack) {
              // guarda la ulta reproduccion
              database.setReproduction(data.nextTrack);

              updateMusic(data.nextTrack);
            }
          }
        },
      );
      playbackQueueEnded = addEventListener(
        'playback-queue-ended',
        async (data: any) => {
          if (data.track) {
            const dataStorage = await AsyncStorage.getItem('@Mode');
            const mode = dataStorage || 'RANDOM';
            if (mode === 'RANDOM') {
              await changeToRandomMode();
              await skipToNext();
            } else {
              const songs = await getQueue();
              skip(songs[0].id);
            }
          }
        },
      );
      remoteStop = addEventListener('remote-stop', () => {
        destroy();
      });
      playbackError = addEventListener('playback-error', (data: any) => {
        console.log('Error playback-error (service.ts) :', data);
      });
    });
  };

  const cleanEvents = () => {
    /* console.log(remotePlay);
    if (remotePlay) {
      remotePlay.remove();
      remotePause.remove();
      remoteNext.remove();
      remotePrevious.remove();
      playbackTrackChanged.remove();
      playbackQueueEnded.remove();
      remoteStop.remove();
      playbackError.remove();
    } */
  };

  return [initEvents, cleanEvents];
};
