import { MSong } from "../app/models/song.model";
import Share, { Options } from 'react-native-share';
import fs from 'react-native-fs';
import AsyncStorage from '@react-native-community/async-storage';
import i18next from "i18next";

/**
 * @description Comparte una canción
 * @param song Canción que se va a compartir
 * @return Promise<void>
 */
export default async (song: MSong): Promise<void> => {
    // const base64 = await fs.readFile(`file://${song.path}`, 'base64');
    // const songPathArray: string[] = song.path.split('.').reverse();
    // const filename: string = `${song.title}`;
    // console.log(song, filename);
    try {
      const options: Options = {
        failOnCancel: false,
        title: i18next.t('share'),
        // url: `data:audio/mp3;base64,${base64}`,
        url: 'file://'+song.path,
        // filename,
        type: 'audio/mp3'
      }

      const result = await Share.open(options);
      // console.log(result);

      // if (!result.dismissedAction) {
      //   const path = `file://${fs.DownloadDirectoryPath}/${filename}`;
      //   const sharesStorage = await AsyncStorage.getItem('@shares');
      //   if (sharesStorage) {
      //     const sharesArray: string[] = JSON.parse(sharesStorage);

      //     sharesArray.push(path);
      //     await AsyncStorage.setItem('@shares', JSON.stringify(sharesArray));
      //   } else {
      //     const sharesArray = [];
      //     sharesArray.push(path);
      //     await AsyncStorage.setItem('@shares', JSON.stringify(sharesArray));
      //   }
      // }
    } catch (error) {
      console.warn(error);
      
      console.error('Share error: ', error);
    }
}