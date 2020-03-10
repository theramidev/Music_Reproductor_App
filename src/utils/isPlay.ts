import {MSong} from '../app/models/song.model';

export const isPlay = (song: MSong, newSong: MSong): boolean => {
  if (!newSong) {
    return false;
  }

  if (song.id === newSong.id) {
    return true;
  } else {
    return false;
  }
};
