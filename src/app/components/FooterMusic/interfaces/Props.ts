import {MSong} from 'src/app/models/song.model';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

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
  };
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

  updateListSongs(songs: MSong[]): void;

  changeToRandomMode(): Promise<void>;
  changeToLineMode(): Promise<void>;

  updateListSongsCurrent(songs: MSong[]): void;

  playInRandom(start: boolean): void;
  playInLine(start: boolean): void;
}
