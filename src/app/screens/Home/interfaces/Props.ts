import {MSong} from 'src/app/models/song.model';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import { WithTranslation } from 'react-i18next';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  // si la ventana tiene el foco
  isFocused: boolean;
  /**
   * @description Manda a buscar las canciones dentro del dispositivo
   */
  getSongs(): Promise<void>;
  musicReducer: {
    listSongs: MSong[];
    loadingListSongs: boolean;
    errorListSongs: any;

    current: MSong;
    mode: string;
    loading: boolean;
    error: any;

    loadingFavorite: boolean;
    errorFavorite: any;

    refreshing: boolean;
  };
  wallpaperReducer: {
    data: {
      currentWallpaper: string | null;
    };
  };
  getCurrentWallpaper(): void;
  /**
   * @description Activa el Music Control y se comienza a reproducir las canciones
   * @param songs Canciones
   */
  activateTrackPlayer(songs: MSong[]): void;

  /**
   * @description cambia los datos de una cancion
   * @param durationInMilisecons Duración de la canción en milisegundo
   */
  updateCurrentMusicForId(id: string): void;

  /**
   * @description Activa el Music Control
   * @param start si se quiere inicar la reproduccion
   */
  playInLine(start: boolean): Promise<void>;
  /**
   * @description Activa el Music Control
   * @param start si se quiere inicar la reproduccion
   */
  playInRandom(start: boolean): Promise<void>;
  changeToLineMode(): Promise<void>;
  /**
   * @description cambia el estado favorito de la cancion
   * @param current
   */
  updateFavorite(current: MSong): Promise<void>;

  deleteSong(song: MSong): Promise<void>;

  /**
   * @description Refresca la lista d reproducción
   * @return void
   */
  refreshListSong(): void;
}
