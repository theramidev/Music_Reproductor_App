import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { MPlaylist } from "../../../models/playlist.model";
import { DocumentPickerResponse } from "react-native-document-picker";
import { WithTranslation } from "react-i18next";

export interface IProps extends WithTranslation {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    playlistReducer: {
        playlists: MPlaylist[],
        loadingPlaylists: boolean
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