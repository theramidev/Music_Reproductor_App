import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {WithTranslation} from 'react-i18next';
import {MSong} from 'src/app/models/song.model';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  musicReducer: {current: MSong};
  /**
   * @description Obtiene las canciones escuchadas recientemente
   * @return Promise<void>
   */
  recentsReducer: {
    listRecents: MSong[];
    loadingRecents: boolean;
    errorRecents: any;
  };

  getRecents(): Promise<void>;
  updateFavorite(current: MSong): Promise<void>;
  deleteSong(song: MSong): Promise<void>;
}
