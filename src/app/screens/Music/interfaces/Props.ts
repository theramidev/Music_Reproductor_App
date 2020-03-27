import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MSong} from '../../../models/song.model';
import { WithTranslation } from 'react-i18next';
import { MPlaylist } from '../../../models/playlist.model';

export interface IProps extends WithTranslation {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
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
  playlistReducer: {
    playlists: MPlaylist[]
  }
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

  /**
   * @description Coloca una nueva canción en la lista de recientes
   * @param songId Id de la canción
   * @return Promise<void>
   */
  setSongToRecent(songId: string): Promise<void>;

  /**
   * @description Obtiene las listas de reproducción
   * @return void
   */
  getPlaylists(): void;

  /**
   * @description Agrega o elimina varias canciones de una lista
   * @param playlistId Id de la lista de reproducción
   * @param songsAdd Ids de las canciones que se van a agegar
   * @param songsDelete Ids de las canciones que se van a elimina
   * @return void
   */
  addAndDeleteSongsOfPLaylist(playlistId: number, songsAdd?: string[], songsDelete?: string[]): void
}
