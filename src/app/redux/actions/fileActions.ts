import { PermissionsAndroid, PermissionStatus } from 'react-native';
import fileTypes from '../types/fileTypes';
import { Dispatch } from 'redux';
import fileSystem from 'react-native-fs';
import TrackPlayer from 'react-native-track-player';

export const getSongs = () => async (dispatch: Dispatch) => {
    dispatch({
        type: fileTypes.loadingGetSongs
    });

    try {
        const hasExternalReadPermissions: boolean = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        // Request Permissions
        if (!hasExternalReadPermissions) {
            const resp: PermissionStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                {
                    title: 'Permitir lectura',
                    message: 'Permitir que esta aplicación lea sus archivos',
                    buttonPositive: 'Permitir',
                    buttonNegative: 'Rechazar'
                }
            )

            if (resp === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Puedes leer archivos');
            }
        }

        const { readDir, ExternalStorageDirectoryPath, getAllExternalFilesDirs, stat } = fileSystem;
        // Get external sd Path
        const dirsExternal = await getAllExternalFilesDirs();
        
        if (dirsExternal[1]) {
            const externalArray: string[] = dirsExternal[1].split('/');
            const externalSDPath: string = `/${externalArray[1]}/${externalArray[2]}`;
            const dirMusic = await readDir(`${externalSDPath}/music`);
            // const file = await stat(dirMusic[2].path);
            // console.log(file);
            await TrackPlayer.setupPlayer();
            const songInfo = getSongInfo(dirMusic[20].name);
            await TrackPlayer.add([
                {
                    id: '0',
                    url: dirMusic[20].path,
                    title: songInfo.songName,
                    artist: songInfo.artist,
                    album: songInfo.album,
                    artwork: require('../../../assets/images/music_notification.png')
                }
            ]);

            TrackPlayer.updateOptions({
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
                ],
                stopWithApp: true,
            });

            TrackPlayer.addEventListener('remote-pause', () => {
                TrackPlayer.pause();
            })

            TrackPlayer.addEventListener('remote-play', () => {
                TrackPlayer.play();
            });

            TrackPlayer.addEventListener('remote-next', () => {
                TrackPlayer.skipToNext();
            });

            TrackPlayer.addEventListener('remote-previous', () => {
                TrackPlayer.skipToPrevious();
            });

            TrackPlayer.play();

            
        }

        // const internalSD = await readDir(ExternalStorageDirectoryPath+'/mp3');
        // const file = await stat(internalSD[1].path);
        // console.log(file);

    } catch (error) {
        console.error(error);
    }
}

const getSongInfo = (name: string) => {
    const nameArray: string[] = name.split('-');
    const songName: string = nameArray[1].trim();
    const artist: string = nameArray[0].trim();
    const album: string = nameArray[2] ? nameArray[2].trim() : 'unknow';

    return {
        songName,
        artist,
        album
    }
}