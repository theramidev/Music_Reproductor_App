import TrackPlayer from 'react-native-track-player';
import {EmitterSubscription} from 'react-native';
var pass: number = 0;

export const PlaybackService = (updateMusic: any) => {
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
      console.log('events');
      pass++;
      remotePlay = TrackPlayer.addEventListener('remote-play', (data: any) => {
        // console.log('Remote Play: ', data);
        TrackPlayer.play();
      });
      remotePause = TrackPlayer.addEventListener(
        'remote-pause',
        (data: any) => {
          //console.log('Remote Pause: ', data);
          TrackPlayer.pause();
        },
      );
      remoteNext = TrackPlayer.addEventListener(
        'remote-next',
        async (data: any) => {
          console.log('Remote Next: ', data);
          await TrackPlayer.skipToNext();
          /* const id: string = await getCurrentTrack();
        updateMusic(id); */
        },
      );
      remotePrevious = TrackPlayer.addEventListener(
        'remote-previous',
        async (data: any) => {
          console.log('Remote Provious: ', data);
          await TrackPlayer.skipToPrevious();
          /* const id: string = await getCurrentTrack();
        updateMusic(id); */
        },
      );
      playbackTrackChanged = TrackPlayer.addEventListener(
        'playback-track-changed',
        async (data: any) => {
          console.log('playback-track-changed: ', data);
          // const id: string = await getCurrentTrack();
          // cuando se cambia de cancion se ejecutara esta funcion
          // que cabiara el estado a la cancion actual
          if (data.track) {
            const currentTrack = await TrackPlayer.getTrack(data.nextTrack);

            if (currentTrack) {
              updateMusic(data.nextTrack);
            }
          }
        },
      );
      playbackQueueEnded = TrackPlayer.addEventListener(
        'playback-queue-ended',
        (data: any) => {
          console.log('playback-queue-ended: ', data);
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
