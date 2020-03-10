import TrackPlayer from 'react-native-track-player';
var pass: number = 0;

export const PlaybackService = (updateMusic: any) => {
  TrackPlayer.registerPlaybackService(() => async () => {
    if (pass > 0) {
      return;
    }
    console.log('events');
    pass++;
    TrackPlayer.addEventListener('remote-play', (data: any) => {
      // console.log('Remote Play: ', data);
      TrackPlayer.play();
    });
    TrackPlayer.addEventListener('remote-pause', (data: any) => {
      //console.log('Remote Pause: ', data);
      TrackPlayer.pause();
    });
    TrackPlayer.addEventListener('remote-next', async (data: any) => {
      console.log('Remote Next: ', data);
      await TrackPlayer.skipToNext();
      /* const id: string = await getCurrentTrack();
      updateMusic(id); */
    });
    TrackPlayer.addEventListener('remote-previous', async (data: any) => {
      console.log('Remote Provious: ', data);
      await TrackPlayer.skipToPrevious();
      /* const id: string = await getCurrentTrack();
      updateMusic(id); */
    });
    TrackPlayer.addEventListener(
      'playback-track-changed',
      async (data: any) => {
        console.log('playback-track-changed: ', data);
        // const id: string = await getCurrentTrack();
        // cuando se cambia de cancion se ejecutara esta funcion
        // que cabiara el estado a la cancion actual
        if (data.track) {
          updateMusic(data.nextTrack);
        }
      },
    );
    TrackPlayer.addEventListener('playback-queue-ended', (data: any) => {
      console.log('playback-queue-ended: ', data);
    });
    TrackPlayer.addEventListener('remote-stop', () => {
      TrackPlayer.destroy();
    });
    TrackPlayer.addEventListener('playback-error', (data: any) => {
      console.log('Error playback-error (service.ts) :', data);
    });
  });
};
