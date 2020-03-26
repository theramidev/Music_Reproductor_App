import {MSong} from '../../../models/song.model';

export interface IProps {
  songs: MSong[];
  navigate: any;
  defaultOrder?: 'ASC' | 'DES' | 'TIME' | 'ARTIST' | 'NOORDER';

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
}
