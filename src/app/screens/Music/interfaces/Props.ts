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
  activateTrackPlayer(songs: MSong[]): void;
  getDuration(durationInMilisecons: number): any;
  updateCurrentMusic(song: MSong): void;
  updateCurrentMusicForId(id: string): void;
}
