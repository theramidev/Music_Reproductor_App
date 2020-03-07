import { ISong, MSong } from "./song.model";

export class MReproduction {
    public reprodcutionId: number;
    public song: MSong;

    constructor(reproduction: IReproduction) {
        this.reprodcutionId = reproduction.reproductionId;
        this.song = new MSong({
            album: reproduction.album,
            author: reproduction.author,
            cover: reproduction.cover,
            duration: reproduction.duration,
            genre: reproduction.genre,
            id: reproduction.songId,
            isFavorite: reproduction.isFavorite,
            lyrics: reproduction.lyrics,
            path: reproduction.path,
            title: reproduction.title
        });
    }
}

export interface IReproduction {
    reproductionId: number,
    songId: string,
    title: string,
    duration: string,
    path: string,
    isFavorite: number,
    author: string | null,
    album: string | null,
    genre: string | null,
    lyrics: string | null,
    cover: string | null
}