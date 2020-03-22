import { MSong } from "../app/models/song.model";
import Share, { Options } from 'react-native-share';
import fs from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import i18n from 'i18next';
import i18next from "i18next";

/**
 * @description Comparte una canción
 * @param song Canción que se va a compartir
 * @return Promise<void>
 */
export default async (song: MSong): Promise<void> => {
    const base64 = await fs.readFile(`file://${song.path}`, 'base64');
    const songPathArray: string[] = song.path.split('.').reverse();
    const filename: string = `${song.title}.${songPathArray[0]}`;
    // console.log(filename);
    try {
      const options: Options = {
        failOnCancel: false,
        title: i18next.t('share'), // Traducir esto
        url: `data:audio/mp3;base64,${base64}`,
        // url: 'file://'+song.path ,
        filename,
        type: 'audio/mp3',
        showAppsToView: true
      }

      const result = await Share.open(options);

      if (!result.dismissedAction) {
        const path = `file://${fs.DownloadDirectoryPath}/${filename}`;
        const sharesStorage = await AsyncStorage.getItem('@shares');
        if (sharesStorage) {
          const sharesArray: string[] = JSON.parse(sharesStorage);

          sharesArray.push(path);
          await AsyncStorage.setItem('@shares', JSON.stringify(sharesArray));
        } else {
          const sharesArray = [];
          sharesArray.push(path);
          await AsyncStorage.setItem('@shares', JSON.stringify(sharesArray));
        }
      }
    } catch (error) {
      console.error('Share error: ', error);
    }
}