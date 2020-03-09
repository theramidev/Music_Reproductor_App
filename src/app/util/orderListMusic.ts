import {MSong} from '../models/song.model';

/**
 * @description retorna una lista de reproduccion aleatoria
 * @param songs
 * @param firstMusic
 */
export const getListRamdonSong = (songs: MSong[], firstMusic?: MSong) => {
  var list = songs.sort(() => Math.random() - 0.5);

  if (firstMusic) {
    list = list.filter((music: MSong) => music.id !== firstMusic.id);
    list.unshift(firstMusic);
  }

  return list;
};
