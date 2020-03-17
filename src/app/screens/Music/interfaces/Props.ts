import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';
import {MSong} from '../../../models/song.model';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  fileReducer: any;
  musicReducer: any;
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
  /**
   * @description modifica la lista de canciones que se reproduciran
   * @param song
   */
  updateListSongs(songs: MSong[]): void;
  changeToLineMode(): void;
  changeToRandomMode(): void;
  /**
   * @description modifica el listdo de reproduccion de las canciones
   * @param song
   */
  updateListSongsCurrent(song: MSong[]): Promise<void>;
}
