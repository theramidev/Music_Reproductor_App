import { SQLiteDatabase, ResultSet } from 'react-native-sqlite-storage';
import { ISong } from '../models/song.model';

class SongController {
    private table: string = 'song';

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
                const existSong: boolean = await this.existSong(database, song.id);

                if (!existSong) {
                    const statement: string = `INSERT INTO ${this.table} 
                    (id, title, duration, path, author, album, genre, lyrics, cover) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
                    const params = [id, title, duration, path, author, album, genre, lyrics, cover]
                    await database.executeSql(statement, params);
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
     * @return Promise<ISong[]>
     */
    public async getSongs(database: SQLiteDatabase): Promise<ISong[]> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `SELECT * FROM ${this.table}`;
                const [result]: [ResultSet] = await database.executeSql(statement);
                // console.log('Result getSongs: ', result.rows.raw());
                resolve(result.rows.raw());
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
     * @return Promise<ISong[]>
     */
    public async getSongById(database: SQLiteDatabase, songId: string): Promise<ISong> {
        return new Promise(async (resolve, reject) => {
            try {
                const statement: string = `SELECT * FROM ${this.table} WHERE id = ?`;
                const [result]: [ResultSet] = await database.executeSql(statement, [songId]);
                // console.log('Result getSongbyId DB: ', result.rows.item(0));
                resolve(result.rows.item(0));
            } catch (error) {
                console.error('Error getSongById DB: ', error);
                reject(error);
            }
        })
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