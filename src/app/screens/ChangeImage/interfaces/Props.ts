import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { WithTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
  
export interface IProps extends WithTranslation {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    wallpaperReducer: {
        data: {
            wallpapers: string[]
        },
        loadings: {
            loadingGetWallpapers: boolean
        }
    },
    /**
     * @description Obtiene los wallpapers
     * @return void
     */
    getWallpapers(): void,
    /**
     * @description Guarda una imagen en las carpetas de la aplicación
     * @param path Ruta de la imagen
     * @param name Nombre de la imagen
     */
    setLocalWallpaper(path: string, name: string): Promise<void>,
    /**
     * @description Cambia el wallpaper actual
     * @param wallpaperPath Ruta del nuevo wallpaper
     */
    changeCurrentWallpaper(wallpaperPath: string | null): void,
    /**
     * @description Elimina un wallpaper de la lista
     * @param wallpaperPath Ruta del wallpaper
     */
    deleteWallpaper(wallpaperPath: string): void
}