
export class MPlaylist {
    public playListId: number;
    public name: string;
    public image: string;
    public created: Date;

    constructor(playlist: IPlaylist) {
        this.playListId = playlist.id;
        this.name = playlist.name;
        this.image = playlist.image;
        this.created = new Date(playlist.date_create);
    }
}

export interface IPlaylist {
    id: number,
    name: string,
    image: string,
    date_create: number
}