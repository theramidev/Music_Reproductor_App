import SQlite, {SQLiteDatabase, Transaction} from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-community/async-storage';

export class DatabaseInitialization {
  public async updateDatabaseTables(database: SQLiteDatabase) {
    // First: create tables if they do not already exist
    return await database.transaction(this.createTables);
  }

  private createTables(transaction: Transaction) {
    try {
      //transaction.executeSql(`DROP TABLE IF EXISTS song`);
      //transaction.executeSql(`DROP TABLE IF EXISTS reproduction`);
      //transaction.executeSql(`DROP TABLE IF EXISTS playlist`);
      //transaction.executeSql(`DROP TABLE IF EXISTS playlist_song`);

      // Coin table
      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS song(
                id TEXT PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                duration TEXT NOT NULL,
                path TEXT NOT NULL,
                isFavorite INTEGER NOT NULL DEFAULT 0,
                author TEXT,
                album TEXT,
                genre TEXT,
                lyrics TEXT,
                cover TEXT
            )`,
      );

      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS reproduction(
                id INTEGER PRIMARY KEY NOT NULL,
                id_song TEXT NOT NULL,
                create_date INTENGER NOT NULL,
                CONSTRAINT fk_songs
                  FOREIGN KEY (id_song)
                  REFERENCES song(id)
                  ON DELETE CASCADE
            )`,
      );

      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS playlist(
                id INTEGER PRIMARY KEY NOT NULL,
                name TEXT NOT NULL,
                image TEXT,
                date_create TEXT NOT NULL
            )`,
      );

      transaction.executeSql(
        `CREATE TABLE IF NOT EXISTS playlist_song(
                id INTEGER PRIMARY KEY NOT NULL,
                id_playlist INTEGER NOT NULL,
                id_song TEXT NOT NULL,
                CONSTRAINT fk_songs
                  FOREIGN KEY (id_song)
                  REFERENCES song(id)
                  ON DELETE CASCADE
            )`,
      );

      console.log('Tables Created!');
    } catch (err) {
      console.log(err);
    }
  }
}
