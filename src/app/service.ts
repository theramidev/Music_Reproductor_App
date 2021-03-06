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
  getState,
  STATE_PLAYING,
  STATE_PAUSED,
  setVolume,
  Track,
} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import fs from 'react-native-fs';
var pass: number = 0;

var remotePlay: EmitterSubscription | any;
var remotePause: EmitterSubscription | any;
var remoteNext: EmitterSubscription | any;
var remotePrevious: EmitterSubscription | any;
var playbackTrackChanged: EmitterSubscription | any;
var playbackQueueEnded: EmitterSubscription | any;
var remoteStop: EmitterSubscription | any;
var playbackError: EmitterSubscription | any;
var pauseTemporarily: boolean = false;
var pauseTemporarilyTime: any = '';

export const PlaybackService = (
  updateMusic: any,
  changeToRandomMode: any,
  changeToLineMode: any,
  setSongToRecent: any,
) => {
  const initEvents = () => {
    registerPlaybackService(() => async () => {
      if (pass > 0) {
        return;
      }
      pass++;
      remotePlay = addEventListener('remote-play', (data: any) => {
        console.log('Remote Play: ', data);
        play();
      });
      remotePause = addEventListener('remote-pause', (data: any) => {
        console.log('Remote Pause: ', data);
        pause();
      });
      remoteNext = addEventListener('remote-next', async () => {
        //console.log('next');
        try {
          await skipToNext();
          await play();
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
            await play();
          }
        }
      });
      remotePrevious = addEventListener(
        'remote-previous',
        async (data: any) => {
          //console.log('Remote Provious: ', data);
          try {
            await skipToPrevious();
            await play();
          } catch (err) {
            if (err.toString() === 'Error: There is no previous track') {
              const songs = await getQueue();
              skip(songs[songs.length - 1].id);
              await play();
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
              updateMusic(data.nextTrack);

              // guarda en la lista de recientes la ultima cancion reproducida
              setSongToRecent(data.nextTrack);
            }
          }

          /* if (data.nextTrack) {
            const currentTrack: Track = await getTrack(data.nextTrack);

            fs.exists(currentTrack.artwork)
              .then((res) => {
                if (res) {
                  upda
                }
              });
          } */
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
              await play();
            } else {
              const songs = await getQueue();
              skip(songs[0].id);
              await play();
            }
          }
        },
      );
      remoteStop = addEventListener('remote-stop', () => {
        destroy();
      });

      //cueando ocurra una interruccion en la aplicacion se disparara este evento
      // pausara la reproduccion si es necesario o la pausara por solo un memonto si
      // es un mensaje o notificacion
      addEventListener('remote-duck', async (data: any) => {
        let {paused: shouldPause, permanent} = data;
        let playerState = await getState();

        if (shouldPause || permanent) {
          pause();
          if (playerState === STATE_PLAYING) {
            pauseTemporarily = !permanent;
            if (pauseTemporarily) {
              pauseTemporarilyTime = Date.now();
            }
          } else {
            pauseTemporarily = false;
          }
        } else if (pauseTemporarily) {
          if (playerState === STATE_PAUSED) {
            // obtieene los segundos en los que fue pausada la cancion
            let secondsSincePause = (Date.now() - pauseTemporarilyTime) / 1000;
            if (secondsSincePause < 5) {
              play();
            }
          }
          pauseTemporarily = false;
        }
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

function effectVol(time: number): Promise<boolean> {
  return new Promise(async (res, rej) => {
    try {
      await setVolume(time);
      setTimeout(() => {
        res(true);
      }, 200);
    } catch (err) {
      console.log(err);
      rej(err);
    }
  });
}
