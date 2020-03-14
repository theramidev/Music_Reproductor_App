import {SQLiteDatabase, ResultSet} from 'react-native-sqlite-storage';
import { MPlaylist, IPlaylist } from '../models/playlist.model';
import { MSong, ISong } from '../models/song.model';


class PlaylistController {
    private playlistTable = 'playlist';
    private playlistSongTable = 'playlist_song';

    /**
     * @description Elimina una canción de la lista de reproducción
     * @param database Base de datos local
     * @param playlistId Id de la lista de reproducción
     * @param songId Id de la canción que se va a quitar
     * @return Promise<void>
     */
    public async deleteSongFromPlaylist(database: SQLiteDatabase, playlistId: number, songId: string): Promise<void> {
        try {
            const statement: string = `DELETE FROM ${this.playlistSongTable} 
            WHERE id_playlist = ? AND id_song = ?`;
            const params = [playlistId, songId];
            await database.executeSql(statement, params);
        } catch (error) {
            console.error('deleteSongFromPlaylist Error: ', error);
            Promise.reject(error);
        }
    }
    /**
     * @description Agrega una canción a una lista de reproducción
     * @param database Base de datos local
     * @param playlistId Id de la lista re reproducción
     * @param songId Id de la canción que se va a agregar
     * @return Promise<void>
     */
    public async addSongToPlaylist(database: SQLiteDatabase, playlistId: number, songId: string): Promise<void> {
        try {
            const statement: string = `INSERT INTO ${this.playlistSongTable} 
            (id_playlist, id_song) VALUE (?, ?)`;
            const params = [playlistId, songId];

            await database.executeSql(statement, params);
        } catch (error) {
            console.error('addSongToPlaylist Error: ', error);
            Promise.reject(error);
        }
    }
    /**
     * @description Obtiene las canciones de una lista de reproducción
     * @param database Base de datos local
     * @param playlistId Id de la lista de reproducción
     * @return Promise<MSong[]>
     */
    public getPlaylistSongs(database: SQLiteDatabase, playlistId: number): Promise<MSong[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `SELECT b.id, b.title, b.duration, b.path, b.isFavorite, 
                b.author, b.album, b.genre, b.lyrics, b.cover FROM ${this.playlistSongTable} AS a 
                INNER JOIN song AS b ON a.id_song = b.id WHERE a.id_playlist = ?`;

                const [result]: [ResultSet] = await database.executeSql(statement, [playlistId]);
                const songs: MSong[] = result.rows.raw().map((song: ISong) => new MSong(song));

                resolve(songs);
            } catch (error) {
                console.error('getPlaylistSongs Error: ', error);
                reject(error);
            }
        });
    }
    /**
     * @description Elimina una lista de reproducción
     * @param database Base de datos local
     * @param playlistId Id de la lista de reproducción que se va a borrar
     * @return Promise<void>
     */
    public async deletePlaylist(database: SQLiteDatabase, playlistId: number): Promise<void> {
        try {
            const statement: string = `DELETE FROM ${this.playlistTable} 
            WHERE id = ?`;
            const statementDeleteSongs: string = `DELETE FROM ${this.playlistSongTable} 
            WHERE id_playlist = ?`;

            await database.executeSql(statement, [playlistId]);
            await database.executeSql(statementDeleteSongs, [playlistId]);
        } catch (error) {
            console.log('deletePlaylist Error: ', error);
            Promise.reject(error);
        }
    }
    /**
     * @description Actualiza los datos de la lista de reproducción
     * @param database Base de datos local
     * @param playlistId Id de la lista de reproducción
     * @param name Nombre de la lista de reproducción
     * @param image Imagen de la lista de reproducción
     */
    public async updatePlaylist(database: SQLiteDatabase, playlistId: number, name: string, image: string | null): Promise<void> {
        try {
            const statement: string = `UPDATE ${this.playlistTable} SET 
            name = ?, image = ? WHERE id = ?`;
            const params = [name, image, playlistId];
            await database.executeSql(statement, params);
        } catch (error) {
            console.error('updatePlaylist Error: ', error);
            Promise.reject(error);
        }
    }
    /**
     * @description Crea una nueva lista de reprducción
     * @param database Base de datos local
     * @param name Nombre de la nueva lista de reproducción
     * @param image Imagen de la lista de reproducción
     * @return Promise<void>
     */
    public async createPlaylist(database: SQLiteDatabase, name: string, image: string | null = null): Promise<void> {
        try {
            const statement: string = `INSERT INTO ${this.playlistTable} 
            (name, image, date_create) VALUES (?, ?, ?)`;
            const params = [name, image, new Date().toDateString()];
            await database.executeSql(statement, params);
        } catch (error) {
            console.error('createPlaylist Error: ', error);
            Promise.reject(error);
        }
    }
    /**
     * @description Busca un playlist por su id
     * @param database Base de datos local
     * @param playlistId Id de la lista de reproducción
     * @return Promise<Mplaylist | null>
     */
    public getPLaylistById(database: SQLiteDatabase, playlistId: number): Promise<MPlaylist | null> {
        return new Promise(  async(resolve, reject) => {
            try {
                const statement: string = `SELECT *  FROM ${this.playlistTable} WHERE id = ?`;
                const [result]: [ResultSet] = await database.executeSql(statement, [playlistId]);
                const playlist: MPlaylist | null = result.rows.item(0) ? new MPlaylist(result.rows.item(0)) : null;
                resolve(playlist);
            } catch (error) {
                console.error('error getPlaylistById: ', error);
                reject(error);
            }
        });
    }
    /**
     * @description Obtiene todas las listas de reproducción de la base de datos
     * @param database Base de datos local
     * @return Promise<MPlaylist[]>
     */
    public getPlaylists(database: SQLiteDatabase): Promise<MPlaylist[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `SELECT * FROM ${this.playlistTable}`;
                const [result]: [ResultSet] = await database.executeSql(statement);
                const playlists: MPlaylist[] = result.rows.raw().map((playlist: IPlaylist) => {
                    return new MPlaylist(playlist);
                });

                resolve(playlists);
            } catch (error) {
                console.error('getPlayList Error: ', error);
                reject(error);
            }
        });
    }
}

export default new PlaylistController();