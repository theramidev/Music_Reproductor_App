import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MPlaylist } from "../../../models/playlist.model";
import { DocumentPickerResponse } from "react-native-document-picker";

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
    getPlaylists(): void,
    /**
     * @description Crea una lista de reproducción
     * @param picker Picker contendor de la imagen
     * @param playlistName Nombre de la lista de reproducción
     * @return void
     */
    createPlaylist(picker: DocumentPickerResponse | null, playlistName: string): void
}