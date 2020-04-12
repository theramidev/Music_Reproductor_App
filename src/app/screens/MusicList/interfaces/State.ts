import { MSong } from "../../../models/song.model";

export interface IState {
    title: string,
    songs: MSong[]
}