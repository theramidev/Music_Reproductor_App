import { SQLiteDatabase } from "react-native-sqlite-storage";

export interface IDatabase {
    open(): Promise<SQLiteDatabase>;
    close(): Promise<void> | undefined;
}