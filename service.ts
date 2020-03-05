import TrackPlayer from 'react-native-track-player';

export default async () => {

    TrackPlayer.addEventListener('remote-play', (data: any) => {
        // console.log('Remote Play: ', data);
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener('remote-pause', (data: any) => {
        // console.log('Remote Pause: ', data);
        TrackPlayer.pause();
    });
    TrackPlayer.addEventListener('remote-next', (data: any) => {
        // console.log('Remote Next: ', data);
        TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener('remote-previous', (data: any) => {
        // console.log('Remote Provious: ', data);
        TrackPlayer.skipToPrevious();
    });
    TrackPlayer.addEventListener('remote-stop', () => {
        TrackPlayer.destroy()
    });
    TrackPlayer.addEventListener('playback-error', (data: any) => {
        console.log('Error playback-error (service.ts) :', data);
    });
    
}