import {MSong} from '../app/models/song.model';

/**
 * @description retorna una lista de reproduccion aleatoria
 * @param songs
 * @param firstMusic
 */
export const getListRamdonSong = (
  songs: MSong[],
  currentMusic?: MSong | null,
  firstMusic?: MSong,
) => {
  var list = songs;
  list.sort(() => Math.random() - 0.5);

  if (firstMusic) {
    list = list.filter((music: MSong) => music.id !== firstMusic.id);
    list.unshift(firstMusic);
  }

  if (currentMusic) {
    list = list.filter((music: MSong) => music.id !== currentMusic.id);
  }

  return list;
};

/**
 * @description retorna una lista de reproduccion en orden
 * @param songs
 * @param currentMusic
 */
export const getListLineSong = (songs: MSong[], currentMusic?: MSong) => {
  alphabeticalOrder(songs);
  var list: MSong[] = [];
  if (currentMusic) {
    var continueSongs = [];
    var lastSongs = [];
    var nextList: boolean = false;
    for (let i = 0; i < songs.length; i++) {
      if (songs[i].id === currentMusic.id) {
        nextList = true;
      }

      if (!nextList) {
        lastSongs.push(songs[i]);
      }

      if (nextList && songs[i].id !== currentMusic.id) {
        continueSongs.push(songs[i]);
      }
    }

    list = [...continueSongs, ...lastSongs];
  }

  return list.length > 0 ? list : songs;
};

/**
 * @description retorna la lista de musicas ordenadas de forma alfabetica
 * @param songs
 */
export const alphabeticalOrder = (songs: any[]) => {
  songs.sort(function(a, b) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    return 0;
  });
};

export const getAlphabeticalOrder = (array: any[]) => {
  var newArray = array;

  newArray.sort(function(a: MSong, b: MSong) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return 1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  return newArray;
};

export const getDesOrder = (array: any[]) => {
  var newArray = array;

  newArray.sort(function(a: MSong, b: MSong) {
    if (a.title.toLowerCase() > b.title.toLowerCase()) {
      return -1;
    }
    if (a.title.toLowerCase() < b.title.toLowerCase()) {
      return 1;
    }
    return 0;
  });

  return newArray;
};

export const getAlphabeticalArtistOrder = (array: any[]) => {
  var newArray = array;

  newArray.sort(function(a: MSong, b: MSong) {
    const authorA = a.author || '<unknown>';
    const authorB = b.author || '<unknown>';
    if (authorA.toLowerCase() > authorB.toLowerCase()) {
      return 1;
    }
    if (authorA.toLowerCase() < authorB.toLowerCase()) {
      return -1;
    }
    return 0;
  });

  return newArray;
};

export const getDurationOrder = (array: any[]) => {
  var newArray = array;

  newArray.sort(function(a: MSong, b: MSong) {
    return a.duration - b.duration;
  });

  return newArray;
};

export const getDateTimeOrder = (array: any[]) => {
  var newArray = array;

  newArray.sort(function(a: any, b: any) {
    return b.reproductionId - a.reproductionId;
  });

  return newArray;
};
