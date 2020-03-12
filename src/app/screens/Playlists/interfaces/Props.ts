import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MPlaylist } from "../../../models/playlist.model";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    playlistReducer: {
        data: {
            playlists: MPlaylist[]
        }
    }
    /**
     * @description Obtiene las listas de reproducción
     * @return void
     */
    getPlaylists(): void
}