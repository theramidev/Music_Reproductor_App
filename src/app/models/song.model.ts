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
    this.id = song.id;
    this.title = song.title;
    this.duration = Number(song.duration);
    this.path = song.path;
    this.isFavorite = song.isFavorite ? true : false;
    this.author = song.author;
    this.album = song.album;
    this.genre = song.genre;
    this.cover = song.cover;
    this.lyrics = song.lyrics;
  }
}

export interface ISong {
  id: string;
  duration: string;
  path: string;
  title: string;
  isFavorite: number | boolean;
  album: string | null;
  author: string | null;
  genre: string | null;
  cover: string | null;
  lyrics: string | null;
}
