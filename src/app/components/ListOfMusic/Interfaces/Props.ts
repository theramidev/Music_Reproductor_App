import {MSong} from '../../../models/song.model';

export interface IProps {
  songs: MSong[];
  navigate: any;

  /**
   * @description cambia el estado favorito de la cancion
   * @param current
   */
  updateFavorite(current: MSong): Promise<void>;

  paddingBottom: number;
}
