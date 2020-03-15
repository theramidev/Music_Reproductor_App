import { DocumentPickerResponse } from "react-native-document-picker";
import { MPlaylist } from "../../models/playlist.model";

export interface IProps {
    onClose(): void,
    onCreate?: (image: DocumentPickerResponse | null, playlistName: string) => void,
    onEdit?: (image: DocumentPickerResponse | null, playlistName: string) => void,
    playlist?: MPlaylist,
    isVisible: boolean
}