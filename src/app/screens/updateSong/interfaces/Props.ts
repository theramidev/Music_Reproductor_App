import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {WithTranslation} from 'react-i18next';
import {TFunction} from 'i18next';
import {MSong} from '../../../models/song.model';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  t: TFunction;
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
   * @description Modifica los datos de una cancion
   * @param song
   */
  updateSong(song: any): Promise<void>;
}
