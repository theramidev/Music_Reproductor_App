import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { ISong, MSong } from '../models/song.model';
import { IReproduction, MReproduction } from '../models/reproduction.model';

class SongController {
    private tableSong: string = 'song';
    private tableReproduction: string = 'reproduction';

    /**
     * @description Inserta en la base de datos la última canción en reproducirse
     * @param database Base de datos local
     * @param songId Id de al canción
     * @return Promise<any>
     */
    public async setReproduction(database: SQLiteDatabase, songId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `INSERT INTO ${this.tableReproduction} 
                (id_song) VALUES (?)`;
                await database.executeSql(statement, [songId]);
            } catch (error) {
                console.error(error);
                reject(error);
            }
        });
    }
    /**
     * @description Obtiene las últimas 20 reproducciones 
     * @param database Base de datos local
     * @return Promise<MReproduction[]>
     */
    public async getReproductions(database: SQLiteDatabase): Promise<MReproduction[]> {
        return new Promise(async(resolve, reject) => {
            try {
                const statement: string = `SELECT a.id AS reproductionId, b.id AS songId, 
                b.title, b.duration, b.path, b.isFavorite, b.author, b.album, b.genre, b.lyrics, b.cover 
                FROM ${this.tableReproduction} AS a INNER JOIN ${this.tableSong} AS b 
                ON a.id_song = b.id ORDER BY a.id DESC LIMIT 20`;

                const [result]: [ResultSet] = await database.executeSql(statement);
                const reproductions: MReproduction[] = result.rows.raw().map((reproduction: IReproduction) => {
                    return new MReproduction(reproduction);
                })

                resolve(reproductions);
            } catch (error) {
                console.error('Error getReproductions: ', error);
                reject(error);
            }
        });
    }
    /**
     * @description Inserta las canciones en la abse de datos
     * @param database Base de datos local
     * @param songs Canciones que van a ser agregadas
     * @return Promise<any> 
     */
    public async setSongs(database: SQLiteDatabase, songs: ISong[]): Promise<any> {
        try {
            for (const song of songs) {
                const { id, title, duration, path, author, album, genre, lyrics, cover } = song;
                const existSongInDB: boolean = await this.existSong(database, song.id);

                if (!existSongInDB) {
                    const statement: string = `INSERT INTO ${this.tableSong} 
                    (id, title, duration, path, author, album, genre, lyrics, cover) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    const params = [id, title, duration, path, author, album, genre, lyrics, cover]
                    await database.executeSql(statement, params);
                }
            }

            const databaseSongs: MSong[] = await this.getSongs(database);
            
            for (const song of databaseSongs) {
                const found: ISong | undefined = songs.find(songFind => {
                    if (songFind.id === song.id) {
                        return true;
                    }
                });

                if (!found) {
                    await this.deleteSong(database, song.id);
                }
            }
            
        } catch (error) {
            console.error('Error setSongs DB: ', error);
            Promise.reject(error);
        }
    }
    /**
     * @description Obtiene TODAS las canciones de la base de datos local
     * @param database Base de datos local
     * @return Promise<MSong[]>
     */
    public async getSongs(database: SQLiteDatabase): Promise<MSong[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `SELECT * FROM ${this.tableSong}`;
                const [result]: [ResultSet] = await database.executeSql(statement);
                // console.log('Result getSongs: ', result.rows.raw());
                const songs: MSong[] = result.rows.raw().map((song: ISong) => new MSong(song));
                resolve(songs);
            } catch (error) {
                console.error('Error getSongs DB: ', error);
                reject(error);
            }
        })
    }
    /**
     * @description Obtiene UNA canción
     * @param database Base de datos local
     * @param songId Id de la canción que se va a buscar
     * @return Promise<MSong[] | undefined>
     */
    public async getSongById(database: SQLiteDatabase, songId: string): Promise<MSong | undefined> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `SELECT * FROM ${this.tableSong} WHERE id = ?`;
                const [result]: [ResultSet] = await database.executeSql(statement, [songId]);
                // console.log('Result getSongbyId DB: ', result.rows.item(0));
                resolve(result.rows.item(0) ? new MSong(result.rows.item(0)) : result.rows.item(0));
            } catch (error) {
                console.error('Error getSongById DB: ', error);
                reject(error);
            }
        })
    }
    /**
     * @description Elimina una canción de la base de datos
     * @param database Base de datos local
     * @param songId Id de la canción
     */
    public async deleteSong(database: SQLiteDatabase, songId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `DELETE FROM ${this.tableSong} WHERE id = ?`;
                await database.executeSql(statement, [songId]);
            } catch (error) {
                console.error('Error Delete Song: ', error);
                reject(error);
            }
        });
    }
    /**
     * @description Verifica si una cacnión existe en a base de datos
     * @param database Base de datos local
     * @param songId Id de la canción
     * @return Promise<boolean>
     */
    public async existSong(database: SQLiteDatabase, songId: string): Promise<boolean> {
        return new Promise(async (resolve, reject) => {
            try {
                const song = await this.getSongById(database, songId);
                if (song) {
                    resolve(true);
                }

                resolve(false);
            } catch (error) {
                console.error('Error existSong DB: ', error);
                reject(error);
            }
        })
    }
}

export default new SongController();