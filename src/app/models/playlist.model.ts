
export class MPlaylist {
    public playListId: number;
    public name: string;
    public image: string;

    constructor(playlist: IPlaylist) {
        this.playListId = playlist.id;
        this.name = playlist.name;
        this.image = playlist.image;
    }
}

export interface IPlaylist {
    id: number,
    name: string,
    image: string
}