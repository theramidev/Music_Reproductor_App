import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MSong} from '../../../models/song.model';
import {WithTranslation} from 'react-i18next';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  musicReducer: {
    searchSongs: MSong[];
    current: MSong;
  };
  /**
   * @description Busca una canción
   * @param words Palabra o nombre de la canción que se va a buscar
   * @return void
   */
  searchSong(words: string): void;
  /**
   * @description Limpia el estado de buscar
   */
  clearSearch(): void;

  updateFavorite(): Promise<void>;

  deleteSong(): Promise<void>;
}
