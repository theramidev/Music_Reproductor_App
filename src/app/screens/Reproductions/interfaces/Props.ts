import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MReproduction} from '../../../models/reproduction.model';
import {WithTranslation} from 'react-i18next';
import {MSong} from 'src/app/models/song.model';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;

  musicReducer: {current: MSong};
  /**
   * @description Obtiene las canciones escuchadas recientemente
   * @return Promise<void>
   */
  fileReducer: {
    data: {
      reproductions: MReproduction[];
    };
    loadings: {
      loadingGetReproductions: boolean;
    };
    error: {
      errorGetReproductions: any;
    };
  };

  getRecents(): Promise<void>;
  updateFavorite(current: MSong): Promise<void>;
  deleteSong(song: MSong): Promise<void>;
}
