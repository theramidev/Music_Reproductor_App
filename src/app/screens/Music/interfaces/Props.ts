import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MSong} from '../../../models/song.model';
import { WithTranslation } from 'react-i18next';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  fileReducer: any;
  musicReducer: {
    listSongs: MSong[];
    listSongsCurrent: MSong[];
    loadingListSongs: boolean;
    errorListSongs: any;
    searchSongs: MSong[];

    current: MSong;
    mode: string;
    loading: boolean;
    error: any;

    loadingUpdateSong: boolean;
    loadingFavorite: boolean;
    errorFavorite: any;
  };
  /**
   * @description Activa el Music Control
   * @param start si se quiere inicar la reproduccion
   */
  playInLine(start: boolean): void;
  /**
   * @description Activa el Music Control
   * @param start si se quiere inicar la reproduccion
   */
  playInRandom(start: boolean): void;

  getDuration(durationInMilisecons: number): any;
  updateCurrentMusic(song: MSong): void;
  updateCurrentMusicForId(id: string): void;

  changeToLineMode(): void;
  changeToRandomMode(): void;
  /**
   * @description modifica el listdo de reproduccion de las canciones
   * @param song
   */
  updateListSongsCurrent(song: MSong[]): Promise<void>;

  setSongToRecent(songId: string): Promise<void>;
}
