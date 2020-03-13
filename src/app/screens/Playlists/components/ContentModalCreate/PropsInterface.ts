import { DocumentPickerResponse } from "react-native-document-picker";

export interface IProps {
    onClose(): void,
    onCreate(image: DocumentPickerResponse | null, playlistName: string): void
}