
export class MSong {
    public id: string;
    public title: string;
    public duration: number;
    public path: string;
    public author: string | null;
    public album: string | null;
    public genre: string | null;
    public cover: string | null;
    public lyrics: string | undefined;

    constructor(song: ISong) {
        this.id = song.id;
        this.title = song.title;
        this.duration = Number(song.duration);
        this.path = song.path;
        this.author = song.author;
        this.album = song.album;
        this.genre = song.genre;
        this.cover = song.cover;
        this.lyrics = song.lyrics
    }
}

export interface ISong {
    id: string,
    duration: string,
    fileName: string,
    path: string,
    title: string,
    album: string | null,
    author: string | null,
    genre: string | null,
    cover: string | null,
    lyrics?: string
}