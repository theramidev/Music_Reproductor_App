import playlistTypes from '../types/playlistType';
import { Dispatch } from 'redux';
import Database from '../../database';

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