import SQLite, {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';
import {DatabaseInitialization} from './DatabaseInitialization';
import SongController from './SongController';
import PlaylistController from './PlaylistController';
import {IDatabase} from './interfaces/Database';
import {ISong, MSong} from '../models/song.model';
import {MReproduction} from '../models/reproduction.model';
import {MPlaylist} from '../models/playlist.model';

class Database implements IDatabase {
  private database: SQLiteDatabase | any;
  private dbName: string = 'music_dm';

  /**
   * @description Elimina una canción de la base de datos y del dispositivo
   * @param songId Id de la canción que se va a eliminar
   * @param path Ruta del archivo de la canción
   * @return Promise<boolean>
   */
  public async deleteSong(songId: string, path: string): Promise<boolean> {
    return SongController.deleteSong(this.database, songId);
  }
  /**
   * @description Actuaiza una canción
   * @param database Base de datos local
   * @param songId Id de la canción
   * @param title Título de la canción
   * @param author Author de la canción
   * @param album Albúm de la canción
   * @param lyrics Letra de la canción
   * @param cover Cover o portada de la canción
   * @return Promise<void>
   */
  public updateSong(
    songId: string,
    title: string,
    author: string | null,
    album: string | null,
    lyrics: string | null,
    cover: string | null,
  ): Promise<void> {
    return SongController.updateSong(
      this.database,
      songId,
      title,
      author,
      album,
      lyrics,
      cover,
    );
  }
  /**
   * @description Busca una o unas canciones
   * @param words Palabra o canción que se va a buscar
   * @return Promise<MSong[]>
   */
  public searchSongs(words: string): Promise<MSong[]> {
    return SongController.getSongsSearch(this.database, words);
  }
  /**
   * @description Elimina una canción de la lista de reproducción
   * @param playlistId Id de la lista de reproducción
   * @param songId Id de la canción
   * @return Promise<void>
   */
  public deleteSongFromPlaylist(
    playlistId: number,
    songIds: string[],
  ): Promise<void> {
    return PlaylistController.deleteSongFromPlaylist(
      this.database,
      playlistId,
      songIds,
    );
  }
  /**
   * @description Agrega una canción a una lista de reproducción
   * @param playlistId Id de la lista de reproducción
   * @param songId Id de la canción que se va a agregar
   * @return Promise<void>
   */
  public addSongToPlaylist(
    playlistId: number,
    songIds: string[],
  ): Promise<void> {
    return PlaylistController.addSongToPlaylist(
      this.database,
      playlistId,
      songIds,
    );
  }
  /**
   * @description Obtiene las canciones de una lista de reproducción
   * @param playlistId Id de la lista de reproducción
   * @return Promise<MSong[]>
   */
  public getPlaylistSongs(playlistId: number): Promise<MSong[]> {
    return PlaylistController.getPlaylistSongs(this.database, playlistId);
  }
  /**
   * @description Elimina una lista de reproducción
   * @param playlistId Id de la lista de reproducción
   * @return Promise<void>
   */
  public deletePlaylist(playlistId: number): Promise<void> {
    return PlaylistController.deletePlaylist(this.database, playlistId);
  }
  /**
   * @description Actualiza los datos de una lista de reproducción
   * @param playlistId Id de la lista de reproducción
   * @param name Nombre de la lista de reproducción
   * @param image Imagen de la lista de reproducción
   * @return Promise<void>
   */
  public updatePlaylist(
    playlistId: number,
    name: string,
    image: string | null = null,
  ): Promise<void> {
    return PlaylistController.updatePlaylist(
      this.database,
      playlistId,
      name,
      image,
    );
  }
  /**
   * @description Crea una lista de reproducción nueva
   * @param name Nombre de la lista de reproducción
   * @param image Imagen de la lista de reproducción
   * @return Promise<void>
   */
  public createPlaylist(
    name: string,
    image: string | null = null,
  ): Promise<void> {
    return PlaylistController.createPlaylist(this.database, name, image);
  }
  /**
   * @description Obtiene una lista de reproducción por su id
   * @param playlistId Id de la lista de reproducción
   * @return Promise<MPlaylist | null>
   */
  public getPlaylistById(playlistId: number): Promise<MPlaylist | null> {
    return PlaylistController.getPLaylistById(this.database, playlistId);
  }
  /**
   * @description Obtiene las listas de reproducción
   * @return Promise<MPlaylist[]>
   */
  public getPlaylists(): Promise<MPlaylist[]> {
    return PlaylistController.getPlaylists(this.database);
  }
  /**
   * @description Actualiza una canción a favorito o no
   * @param songId Id de la canción que se va a modificar
   * @param isFavorite Si es favorito o no
   * @return Promise<void>
   */
  public async updateSongToFavorite(
    songId: string,
    isFavorite: boolean,
  ): Promise<void> {
    return SongController.updateSongToFavorite(
      this.database,
      songId,
      isFavorite,
    );
  }
  /**
   * @description Obtiene las canciones favoritas
   * @return Promise<MSong[]>
   */
  public async getFavoriteSongs(): Promise<MSong[]> {
    return SongController.getFavoriteSongs(this.database);
  }
  /**
   * @description Inserta la última canción en reproducirse
   * @param songId Id de la canción que se va a reproducir
   * @return Promise<void>
   */
  public async setReproduction(songId: string): Promise<void> {
    return SongController.setReproduction(this.database, songId);
  }
  /**
   * @description Obtiene las últimas reproducciones
   * @return Promise<MReproduction[]>
   */
  public async getReproductions(): Promise<MReproduction[]> {
    return SongController.getReproductions(this.database);
  }
  /**
   * @description Agrega canciones a la abse de datos local
   * @param songs Canciones que van a ser agregadas
   */
  public async setSongs(songs: ISong[]): Promise<void> {
    SongController.setSongs(this.database, songs);
  }
  /**
   * @description Obtiene las canciones de la base de datos local
   * @return Promise<ISong[]>
   */
  public async getSongs(): Promise<MSong[]> {
    return SongController.getSongs(this.database);
  }
  /**
   * @description Obtiene una cación por su id
   * @param songId Id del la canción
   * @return Promise<ISong>
   */
  public async getSongById(songId: string): Promise<MSong | undefined> {
    return SongController.getSongById(this.database, songId);
  }

  public async openDatabase(deleteTableSong: boolean): Promise<SQLiteDatabase> {
    return new Promise(async (resolve, rej) => {
      try {
        SQLite.DEBUG(false);
        SQLite.enablePromise(true);
        const db: SQLiteDatabase = await SQLite.openDatabase({
          name: this.dbName,
          location: 'default',
        });
        const initialization: DatabaseInitialization = new DatabaseInitialization();
        if (db) {
          console.log('Database Open!');
          this.database = db;
          if (deleteTableSong) {
            await this.database.transaction((transaction: Transaction) => {transaction.executeSql(`DROP TABLE IF EXISTS song`)});
          }
          await initialization.updateDatabaseTables(this.database);
        }
        resolve(db);
      } catch (error) {
        console.log('[Open DB Error]', error);
        rej(error);
      }
    });
  }

  public close(): Promise<void> | undefined {
    return this.database?.close();
  }
}

export default new Database();
