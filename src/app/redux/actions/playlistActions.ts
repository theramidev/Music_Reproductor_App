import playlistTypes from '../types/playlistTypes';
import {Dispatch} from 'redux';
import Database from '../../database';
import fs, {StatResult} from 'react-native-fs';
import {ShowToast} from '../../../utils/toast';

export const addAndDeleteSongsOfPLaylist = (
  playlistId: number,
  songsAdd: string[] = [],
  songsDelete: string[] = [],
) => async (dispatch: Dispatch) => {
  try {
    if (songsAdd.length) {
      await Database.addSongToPlaylist(playlistId, songsAdd);
    }

    if (songsDelete.length) {
      await Database.deleteSongFromPlaylist(playlistId, songsDelete);
    }

    const songs = await Database.getPlaylistSongs(playlistId);

    dispatch({
      type: playlistTypes.getPlaylistSongs,
      payload: songs,
    });
  } catch (error) {
    console.error('Error addAndDeleteSongsOfPLaylist: ', error);
  }
};

/**
 * @description Obtiene las canciones de una lista de reproducción
 */
export const getPlaylistSongs = (playlistId: number) => async (
  dispatch: Dispatch,
) => {
  try {
    const songs = await Database.getPlaylistSongs(playlistId);

    dispatch({
      type: playlistTypes.getPlaylistSongs,
      payload: songs,
    });
  } catch (error) {
    console.error('Error getPLaylistSongs: ', error);
  }
};

/**
 * @description Limpia el playlist actual
 */
export const cleanCurrentPlaylist = () => (dispatch: Dispatch) => {
  dispatch({
    type: playlistTypes.cleanCurrentPlaylist,
  });
};

/**
 * @description Obtiene el playlist actual
 */
export const getCurrentPLaylist = (playlistId: number) => async (
  dispatch: Dispatch,
) => {
  try {
    const playlist = await Database.getPlaylistById(playlistId);
    // console.log(playlist);
    dispatch({
      type: playlistTypes.getCurrentPlaylist,
      payload: playlist,
    });
  } catch (error) {
    console.error('Error getCurrentPlaylist: ', error);
  }
};

/**
 * @description Edita una lista de reprodución
 */
export const updatePlaylist = (
  playlistId: number,
  playlistName: string,
  picker: {uri: string, name: string} | null,
) => async (dispatch: Dispatch) => {
  try {
    const playlist = await Database.getPlaylistById(playlistId);
    let pathImage: string | null = playlist?.image ? playlist.image : null;

    if (playlist) {
      if (picker) {
        if (playlist.image) {
          await fs.unlink(playlist.image);
        }

        await fs.copyFile(
          picker.uri,
          `${fs.DocumentDirectoryPath}/playlists/${playlistName.trim()}_${
            picker.name
          }`,
        );
        const file = await fs.stat(
          `${fs.DocumentDirectoryPath}/playlists/${playlistName.trim()}_${
            picker.name
          }`,
        );
        pathImage = 'file://' + file.path;
      }

      await Database.updatePlaylist(playlistId, playlistName, pathImage);
      ShowToast('Actualización exitosa');
    }

    const playlists = await Database.getPlaylists();
    const currentPLaylist = await Database.getPlaylistById(playlistId);

    dispatch({
      type: playlistTypes.getCurrentPlaylist,
      payload: currentPLaylist,
    });

    dispatch({
      type: playlistTypes.updatePlaylists,
      payload: playlists,
    });
  } catch (error) {
    console.error('Error editPLaylist: ', error);
  }
};

/**
 * @description Elimina un playlist
 */
export const deletePlaylist = (playlistId: number) => async (
  dispatch: Dispatch,
) => {
  try {
    const playlist = await Database.getPlaylistById(playlistId);

    if (playlist?.image) {
      await fs.unlink(playlist.image);
    }

    await Database.deletePlaylist(playlistId);

    const playlists = await Database.getPlaylists();

    dispatch({
      type: playlistTypes.updatePlaylists,
      payload: playlists,
    });
  } catch (error) {
    console.error('Error delete PLaylist: ', error);
  }
};

/**
 * @description Crea una lista de reproducción
 */
export const createPlaylist = (
  image: {uri: string, name: string} | null,
  playlistName: string,
) => async (dispatch: Dispatch) => {
  try {
    const existsDir = await fs.exists(`${fs.DocumentDirectoryPath}/playlists`);
    const existsFile = await fs.exists(
      `${fs.DocumentDirectoryPath}/playlists/${image?.name}`,
    );
    let imagePath: string | null = null;

    if (!existsDir) {
      await fs.mkdir(`${fs.DocumentDirectoryPath}/playlists`);
    }

    if (image) {
      let file: StatResult | null;
      if (existsFile) {
        file = await fs.stat(
          `${fs.DocumentDirectoryPath}/playlists/${playlistName.trim()}_${
            image.name
          }`,
        );
      } else {
        await fs.copyFile(
          image.uri,
          `${fs.DocumentDirectoryPath}/playlists/${playlistName.trim()}_${
            image.name
          }`,
        );
        file = await fs.stat(
          `${fs.DocumentDirectoryPath}/playlists/${playlistName.trim()}_${
            image.name
          }`,
        );
      }

      imagePath = 'file://' + file.path;
    }

    await Database.createPlaylist(playlistName, imagePath);

    const playlists = await Database.getPlaylists();

    dispatch({
      type: playlistTypes.updatePlaylists,
      payload: playlists,
    });
  } catch (error) {
    console.error('createPlaylist Error: ', error);
  }
};

/**
 * @description Obtiene las listas de reproducción
 */
export const getPlaylists = () => async (dispatch: Dispatch) => {
  dispatch({
    type: playlistTypes.loadigGetPlaylists,
  });

  try {
    const playlists = await Database.getPlaylists();

    dispatch({
      type: playlistTypes.updatePlaylists,
      payload: playlists,
    });
  } catch (error) {
    console.error('getPlaylistsR Error: ', error);
  }
};
