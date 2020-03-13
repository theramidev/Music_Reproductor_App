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
   * @description Activa el Music Control y se comienza a reproducir las canciones
   * @param songs Canciones
   */
  playInLine(songs: MSong[], songSelected: MSong): void;
  getDuration(durationInMilisecons: number): any;
  updateCurrentMusic(song: MSong): void;
  updateCurrentMusicForId(id: string): void;
  /**
   * @description modifica la lista de canciones que se reproduciran
   * @param song
   */
  updateListSongs(songs: MSong[]): void;
  playInRandom(songs: MSong[], songSelected?: MSong): void;
  changeToLineMode(): void;
  changeToRandomMode(): void;
}
