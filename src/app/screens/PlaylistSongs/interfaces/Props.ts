import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {DocumentPickerResponse} from 'react-native-document-picker';
import {MPlaylist} from '../../../models/playlist.model';
import {MSong} from '../../../models/song.model';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  playlistReducer: {
    currentPlaylist: MPlaylist | null;
    playlistSongs: MSong[];
    loadingPlaylists: boolean;
  };
  musicReducer: {
    listSongs: MSong[];
  };
  /**
   * @description Elimina una lista de reproducción
   * @param playlistId Id de la lista de reproducción
   */
  deletePlaylist(playlistId: number): void;
  /**
   * @description Actualiza la lista ed reproducción
   * @param playlistId Id de la lista de reproducción
   * @param playlistName Nombre de la lista de reproducción
   * @param picker Picker que contiene la imagen
   * @return void
   */
  updatePlaylist(
    playlistId: number,
    playlistName: string,
    picker: DocumentPickerResponse | null,
  ): void;
  /**
   * @description Limpia el playlist actual
   * @return void
   */
  cleanCurrentPlaylist(): void;
  /**
   * @description Obtiene el playlist actual
   * @param playlistId Id de la lista de reproducción
   * @return void
   */
  getCurrentPLaylist(playlistId: number): void;
  /**
   * @description Trae todas las canciones
   * @return void
   */
  getSongs(): void;
  /**
   * @description Obtiene las canciones de la lista de reproducción
   * @param playlistId Id de la lista de reproducción
   * @return void
   */
  getPlaylistSongs(playlistId: number): void;
  /**
   * @description Agrega o limina canciones de la lista de reproducción
   * @param playlistId Id de la lista de reproducción
   * @param songsAdd Ids de las canciones que se van a agregar a la lista
   * @param songsDelete Ids de las canciones que se van a eliminar de la lista
   * @return void
   */
  addAndDeleteSongsOfPLaylist(
    playlistId: number,
    songsAdd?: string[],
    songsDelete?: string[],
  ): void;

  /**
   * @description modifica el estado favorito de una cancion
   * @param current
   */
  updateFavorite(current: MSong): Promise<void>;
}
