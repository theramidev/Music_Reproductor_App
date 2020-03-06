export class MSong {
  public id: string;
  public title: string;
  public duration: string;
  public path: string;
  public author: string | null;
  public album: string | null;
  public genre: string | null;

  constructor(song: ISong) {
    this.id = song.id;
    this.title = song.title;
    this.duration = song.duration;
    this.path = song.path;
    this.author = song.author;
    this.album = song.album;
    this.genre = song.genre;
  }
}

export interface ISong {
  id: string;
  duration: string;
  fileName: string;
  path: string;
  title: string;
  album: string | null;
  author: string | null;
  genre: string | null;
}
