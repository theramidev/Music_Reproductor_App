import { SQLiteDatabase } from "react-native-sqlite-storage";

export interface IDatabase {
    openDatabase(deleteTableSong: boolean): Promise<SQLiteDatabase>;
    close(): Promise<void> | undefined;
}