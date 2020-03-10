import wallpaperTypes from '../types/wallpaperTypes';
import { Dispatch } from 'redux';
import fs from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import { ShowToast } from '../../../utils/toast';

/**
 * @description Elimina un wallpaper de la aplicación
 * @param wallpaperPath Ruta del Wallpaper
 */
export const deleteWallpaper = (wallpaperPath: string) => async (dispatch: Dispatch) => {
    try {
        const path: string = 'file://'+wallpaperPath;
        const dirPath: string = `${fs.DocumentDirectoryPath}/wallpapers`;
        const fileExist: boolean = await fs.exists(path);

        if (fileExist) {
            await fs.unlink(path);
        }

        const wallpapersDir = await fs.readDir(dirPath);
        const wallpapersPath: string[] = wallpapersDir.map(item => item.path);

        dispatch({
            type: wallpaperTypes.getWallpapers,
            payload: wallpapersPath
        });
    } catch (error) {
        console.error('deleteWallpaper Error: ', error);
    }
}

/**
 * @description Cambia el wallpaper actual
 * @param wallpaperPath Ruta del nuevo wallpaper
 */
export const changeCurrentWallpaper = (wallpaperPath: string) => async (dispatch: Dispatch) => {
    try {
        const path: string = 'file://' + wallpaperPath;
        await AsyncStorage.setItem('currentWallpaper', path);
        const currentWallpaper: string | null = await AsyncStorage.getItem('currentWallpaper');

        dispatch({
            type: wallpaperTypes.changeCurrentWallpaper,
            payload: currentWallpaper
        });

        ShowToast('Fondo cambiado con éxito', 3);
    } catch (error) {
        console.error('setCurrentWallpaper: ', error);
    }
}

/**
 * @description Obtiene el wallpaper actual de la aplicación
 */
export const getCurrentWallpaper = () => async (dispatch: Dispatch) => {
    try {
        const currentWallpaper: string | null = await AsyncStorage.getItem('currentWallpaper');
        console.log(currentWallpaper);
        dispatch({
            type: wallpaperTypes.changeCurrentWallpaper,
            payload: currentWallpaper
        });
    } catch (error) {
        console.error('getCurrentWallpaper: ', error);
    }
}

/**
 * @description Guarda una imagen en las carpetas de la aplicación
 * @param path Ruta de la imagen
 * @param name Nombre de la imagen
 */
export const setLocalWallpaper = (path: string, name: string) => async (dispatch: Dispatch) => {
    try {
        const dirPath: string = `${fs.DocumentDirectoryPath}/wallpapers`;
        const dirExist: boolean = await fs.exists(dirPath);

        if (!dirExist) {
            await fs.mkdir(dirPath);
        }

        const fileExist: boolean = await fs.exists(`${dirPath}/${name}`);

        if (!fileExist) {
            await fs.copyFile(path, `${dirPath}/${name}`);
        }

        const wallpapersDir = await fs.readDir(dirPath);
        const wallpapersPath: string[] = wallpapersDir.map(item => item.path);

        dispatch({
            type: wallpaperTypes.getWallpapers,
            payload: wallpapersPath
        });
    } catch (error) {
        console.error('setWallpaper Error: ', error);
    }
}

/**
 * @description Obtiene todos los wallpapers de la aplicaión
 */
export const getWallpapers = () => async (dispatch: Dispatch) => {
    dispatch({
        type: wallpaperTypes.loadingGetWalpapers
    });

    try {
        const dirPath: string = fs.DocumentDirectoryPath + '/wallpapers'
        const wallpapersDir = await fs.readDir(dirPath);
        const wallpapersPath: string[] = wallpapersDir.map(item => item.path);

        dispatch({
            type: wallpaperTypes.getWallpapers,
            payload: wallpapersPath
        });
    } catch (error) {
        console.error('getWalppapers Error: ', error);
    }
}