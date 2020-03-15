import { MPlaylist } from "../../../models/playlist.model";

export interface IState {
    headerTitle: string,
    playlist: MPlaylist,
    isDeleteVisible: boolean,
    isEditVisible: boolean,
    isAddVisible: boolean
}