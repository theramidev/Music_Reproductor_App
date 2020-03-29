import { MSong } from "../../../models/song.model";

export interface IState {
    dir: {
        id: string,
        name: string,
        path: string
    },
    songs: MSong[]
}