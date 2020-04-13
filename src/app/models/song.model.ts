export class MSong {
  public id: string;
  public title: string;
  public duration: number;
  public path: string;
  public isFavorite: boolean;
  public author: string | null;
  public album: string | null;
  public genre: string | null;
  public cover: string | null;
  public lyrics: string | null;

  constructor(song: ISong) {
    this.id = song.id.toString();
    this.title = song.title;
    this.duration = Number(song.duration);
    this.path = song.path;
    this.isFavorite = song.isFavorite ? true : false;
    this.author = song.author || null;
    this.album = song.album;
    this.genre = song.genre || null;
    this.cover =
      song.cover === 'file://' || song.cover === undefined || song.cover === ''
        ? null
        : song.cover;
    this.lyrics = song.lyrics || null;
  }
}

export interface ISong {
  id: string;
  path: string;
  cover?: string | undefined;
  duration: number;
  album: string;
  artist: string;
  title: string;

  isFavorite?: number | boolean;
  author?: string | null;
  genre?: string | null;
  lyrics?: string | null;
}
