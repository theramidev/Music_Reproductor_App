import { DocumentPickerResponse } from "react-native-document-picker";
import { MPlaylist } from "../../models/playlist.model";

export interface IProps {
    onClose(): void,
    onCreate?: (image: {uri: string, name: string} | null, playlistName: string) => void,
    onEdit?: (image: {uri: string, name: string} | null, playlistName: string) => void,
    playlist?: MPlaylist,
    isVisible: boolean
}