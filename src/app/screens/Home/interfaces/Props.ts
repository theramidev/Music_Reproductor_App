import {ISong, MSong} from 'src/app/models/song.model';
import {
  NavigationScreenProp,
  NavigationState,
  NavigationParams,
} from 'react-navigation';

export interface IProps {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
  /**
   * @description Manda a buscar las canciones dentro del dispositivo
   */
  getSongs(): Promise<void>;
  fileReducer: {
    data: {
      songs: MSong[];
    };
    loadings: {
      loadingSongs: boolean;
    };
    errors: {
      errorSongs: any;
    };
  };
  /**
   * @description Activa el Music Control y se comienza a reproducir las canciones
   * @param songs Canciones
   */
  activateTrackPlayer(songs: MSong[]): void;
  /**
   * @description Obtiene el tiempo de duración de la canción en formato mm:ss. Ej: 4:12
   * @param durationInMilisecons Duración de la canción en milisegundo
   * @return string
   */
  getDuration(durationInMilisecons: number): string;
}
