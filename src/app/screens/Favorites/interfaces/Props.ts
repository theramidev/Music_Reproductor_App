import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MSong} from '../../../models/song.model';
import { WithTranslation } from 'react-i18next';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  /**
   * @description Obtiene las canciones favoritas
   * @return void
   */
  getFavoriteSongs(): void;

  /**
   * @description Modifca el estado favorito de la cancion
   * @return void
   */
  updateFavorite(current: MSong): Promise<void>;
  favoritesReducer: {
    listFavorites: MSong[];
    loadingFavorites: boolean;
    errorFavorites: any;
  };
}
