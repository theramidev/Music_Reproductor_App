import SQlite, { SQLiteDatabase, Transaction } from 'react-native-sqlite-storage';

export class DatabaseInitialization {

    public updateDatabaseTables(database: SQLiteDatabase) {
        // First: create tables if they do not already exist
        return database.transaction(this.createTables);
    }

    private createTables(transaction: Transaction) {

        // Coin table
        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS song(
                id TEXT PRIMARY KEY NOT NULL UNIQUE,
                title TEXT NOT NULL,
                duration TEXT NOT NULL,
                path TEXT NOT NULL,
                isFavorite INTEGER NOT NULL DEFAULT 0,
                author TEXT,
                album TEXT,
                genre TEXT,
                lyrics TEXT,
                cover TEXT
            )`
        );

        transaction.executeSql(
            `CREATE TABLE IF NOT EXISTS reproduction(
                id INTEGER PRIMARY KEY NOT NULL UNIQUE,
                id_song TEXT NOT NULL UNIQUE
            )`
        );

        console.log('Tables Created!');
    }
}