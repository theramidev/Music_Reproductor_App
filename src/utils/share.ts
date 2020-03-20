import { MSong } from "../app/models/song.model";
import Share, { Options } from 'react-native-share';
import fs from 'react-native-fs';

/**
 * @description Comparte una canción
 * @param song Canción que se va a compartir
 * @return Promise<void>
 */
export default async (song: MSong): Promise<void> => {
    const base64 = await fs.readFile(`file://${song.path}`, 'base64');
    const songPathArray: string[] = song.path.split('.').reverse();
    const filename: string = `${song.title}.${songPathArray[0]}`
    console.log(filename);
    try {
      const options: Options = {
        failOnCancel: false,
        title: 'Compartir con',
        url: `data:audio/mp3;base64,${base64}`,
        filename
      }

      await Share.open(options);
    } catch (error) {
      console.error('Share error: ', error);
    }
}