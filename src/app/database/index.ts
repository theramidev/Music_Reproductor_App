import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';
import { DatabaseInitialization } from './DatabaseInitialization';
import SongController from './SongController';
import { IDatabase } from './interfaces/Database';
import { ISong, MSong } from '../models/song.model';

class Database implements IDatabase {
    private database: SQLiteDatabase | any;
    private dbName: string = 'music_dm';
    /**
     * @description Inserta la última canción en reproducirse
     * @param songId Id de la canción que se va a reproducir
     * @return Promise<void>
     */
    public async setReproduction(songId: string): Promise<void> {
        SongController.setReproduction(this.database, songId);
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

    public async open(): Promise<SQLiteDatabase> {
        return new Promise(async (resolve) => {
            try {
                SQLite.DEBUG(__DEV__);
                SQLite.enablePromise(true);
                const db: SQLiteDatabase = await SQLite.openDatabase({name: this.dbName, location: 'default'});
                const initialization: DatabaseInitialization = new DatabaseInitialization();
                if (db) {
                    console.log('Database Open!');
                    this.database = db;
                    initialization.updateDatabaseTables(this.database);
                }
                resolve(db);
            } catch (error) {
                console.log('[Open DB Error]', error);
            }
        })
    }

    public close(): Promise<void> | undefined {
        return this.database?.close();
    }

}

export default new Database();