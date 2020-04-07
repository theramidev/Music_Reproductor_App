import {MSong} from '../../../models/song.model';
import {MPlaylist} from '../../../models/playlist.model';

export interface IProps {
  item: MSong;
  songs: MSong[];
  navigate: any;

  openOptions(item: MSong): void;
}
