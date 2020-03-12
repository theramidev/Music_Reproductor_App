import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MPlaylist } from "src/app/models/playlist.model";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    /**
     * @description Obtiene las listas de reproducción
     * @return void
     */
    getPlaylists(): void
}