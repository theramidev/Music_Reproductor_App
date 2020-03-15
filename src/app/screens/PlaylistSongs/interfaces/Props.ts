import { NavigationScreenProp, NavigationState, NavigationParams } from "react-navigation";
import { DocumentPickerResponse } from "react-native-document-picker";
import { MPlaylist } from "../../../models/playlist.model";

export interface IProps {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>,
    playlistReducer: {
        data: {
            currentPlaylist: MPlaylist | null
        }
    }
    /**
     * @description Elimina una lista de reproducción
     * @param playlistId Id de la lista de reproducción
     */
    deletePlaylist(playlistId: number): void,
    /**
     * @description Actualiza la lista ed reproducción
     * @param playlistId Id de la lista de reproducción
     * @param playlistName Nombre de la lista de reproducción
     * @param picker Picker que contiene la imagen
     * @return void
     */
    updatePlaylist(playlistId: number, playlistName: string, picker: DocumentPickerResponse | null): void,
    /**
     * @description Limpia el playlist actual
     * @return void
     */
    cleanCurrentPlaylist(): void,
    /**
     * @description Obtiene el playlist actual
     * @param playlistId Id de la lista de reproducción
     * @return void
     */
    getCurrentPLaylist(playlistId: number): void
}