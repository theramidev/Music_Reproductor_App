import playlistTypes from '../types/playlistType';
import { Dispatch } from 'redux';
import Database from '../../database';
import { DocumentPickerResponse } from 'react-native-document-picker';
import fs, { StatResult } from 'react-native-fs';

export const createPlaylist = (picker: DocumentPickerResponse | null, playlistName: string) => async (dispatch: Dispatch) => {
    try {
        const existsDir = await fs.exists(`${fs.DocumentDirectoryPath}/playlists`);
        const existsFile = await fs.exists(`${fs.DocumentDirectoryPath}/playlists/${picker?.name}`);
        let imagePath: string | null = null;

        if (!existsDir) {
            await fs.mkdir(`${fs.DocumentDirectoryPath}/playlists`);
        }

        if (picker) {
            let file: StatResult | null ;
            if (existsFile) {
                file = await fs.stat(`${fs.DocumentDirectoryPath}/playlists/${picker.name}`);
            } else {
                await fs.moveFile(picker.uri, `${fs.DocumentDirectoryPath}/playlists/${picker.name}`);
                file = await fs.stat(`${fs.DocumentDirectoryPath}/playlists/${picker.name}`);
            }

            imagePath = 'file://'+file.path;
        }

        await Database.createPlaylist(playlistName, imagePath);

        const playlists = await Database.getPlaylists();

        dispatch({
            type: playlistTypes.getPlaylists,
            payload: playlists
        });


    } catch (error) {
        console.error('createPlaylist Error: ', error);
    }
}

/**
 * @description Obtiene las listas de reproducción
 */
export const getPlaylists = () => async (dispatch: Dispatch) => {
    dispatch({
        type: playlistTypes.loadigGetPlaylists
    });

    try {
        const playlists = await Database.getPlaylists();

        dispatch({
            type: playlistTypes.getPlaylists,
            payload: playlists
        });
    } catch (error) {
        console.error('getPlaylistsR Error: ', error);
    }
}