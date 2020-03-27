import {MSong} from '../../../models/song.model';
import {MPlaylist} from '../../../models/playlist.model';

export interface IProps {
  songs: MSong[];
  navigate: any;
  defaultOrder?: 'ASC' | 'DES' | 'TIME' | 'ARTIST' | 'NOORDER';
  playlistReducer: {
    playlists: MPlaylist[];
  };

  /**
   * @description Obtiene las listas de reproducción
   */
  getPlaylists(): void;

  /**
   *
   * @param playlistId Id de la lista de reproducción
   * @param songsAdd Ids de las canciones que se van a agregar
   * @param songsDelete Ids de las canciones que van a ser eliminadas de la lista
   */
  addAndDeleteSongsOfPLaylist(
    playlistId: number,
    songsAdd?: string[],
    songsDelete?: string[],
  ): void;

  /**
   * @description cambia el estado favorito de la cancion
   * @param current
   */
  updateFavorite(current: MSong): Promise<void>;

  /**
   * @description elimina la cancion seleccionada
   * @param song cancion actual
   */
  deleteSong(song: MSong): Promise<void>;

  paddingBottom: number;

  onRefresh?: () => void;
  refreshing?: boolean;
}
