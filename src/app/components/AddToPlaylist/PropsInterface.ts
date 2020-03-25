import { MPlaylist } from "../../models/playlist.model";

export interface IProps {
    isVisible: boolean,
    onClose: () => void,
    playlists: MPlaylist[],
    onCreate(playlist: MPlaylist): void
}