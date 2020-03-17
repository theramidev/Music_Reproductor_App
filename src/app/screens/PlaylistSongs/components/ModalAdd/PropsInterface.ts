import { MSong } from "../../../../models/song.model";

export interface IProps {
    isVisible: boolean,
    onClose(): void,
    onAdd(songsAdd: string[], songsDelete: string[]): void,
    songs: MSong[],
    oldSongs: MSong[]
}