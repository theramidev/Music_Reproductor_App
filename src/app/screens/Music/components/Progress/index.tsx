import React, {useState, useEffect} from 'react';
import Slider from '@react-native-community/slider';
import {Text, View, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './style';

import AntDesign from 'react-native-vector-icons/AntDesign';

import TrackPlayer, {
  getPosition,
  seekTo,
  pause,
  play,
  skipToNext,
  skipToPrevious,
  skip,
  getQueue,
  getState,
} from 'react-native-track-player';
import Actions from '../Actions';
import {getDuration} from '../../../../../utils/duration';
import AsyncStorage from '@react-native-community/async-storage';

export const Progress = ({
  duration,
  changeToLineMode,
  changeToRandomMode,
}: any) => {
  const [position, setPosition] = useState(0);
  const [pauseMusic, setPauseMusic] = useState(false);
  const styles = useDynamicStyleSheet(dynamicStyles);

  useEffect(() => {
    // obtiene el estado de la reproduccion (usado para saber si esta en pausa o no)
    getState().then(state => {
      if (state === 2) {
        setPauseMusic(true);
      } else if (state === 3) {
        setPauseMusic(false);
      }
    });
    // obtiene el tiempo en seg de la musica que se esta reproduciendo
    getPosition().then(seg => {
      setPosition(+seg * 1000);
    });

    // realiza un interval para obtener el tienpo actual de la cancion
    var interval = setInterval(() => {
      getPosition().then(seg => {
        setPosition(+seg * 1000);
      });
    }, 700);

    var playbackState = TrackPlayer.addEventListener(
      'playback-state',
      (data: {state: number}) => {
        if (data.state === 2) {
          setPauseMusic(true);
        } else if (data.state === 3) {
          setPauseMusic(false);
        }
        //data.state === 2 ? setPauseMusic(true) : setPauseMusic(false);
      },
    );

    return () => {
      clearInterval(interval);
      playbackState.remove();
    };
  }, []);

  const stop = async () => {
    await pause();
    setPauseMusic(true);
  };

  const playSond = async () => {
    await play();
    setPauseMusic(false);
  };

  const previousSong = async () => {
    try {
      await skipToPrevious();
    } catch (err) {
      if (err.toString() === 'Error: There is no previous track') {
        const songs = await getQueue();
        skip(songs[songs.length - 1].id);
      }
    }
  };

  const nextSong = async () => {
    try {
      await skipToNext();
    } catch (err) {
      if (err.toString() === 'Error: There is no tracks left to play') {
        const data = await AsyncStorage.getItem('@Mode');
        const mode = data || 'RANDOM';

        if (mode === 'RANDOM') {
          await changeToRandomMode();
        } else {
          await changeToLineMode();
        }

        await skipToNext();
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <View style={styles.time}>
          <Text style={styles.start}>{getDuration(position)}</Text>
          <Text style={styles.finish}>{getDuration(+duration)}</Text>
        </View>
        <Slider
          minimumValue={0}
          maximumValue={+duration}
          value={position}
          minimumTrackTintColor="#00F1DF"
          thumbTintColor="#E2E2E2"
          onValueChange={milSeg => {
            seekTo(milSeg * 0.001);
            setPosition(milSeg);
          }}
        />

        <View style={styles.actions}>
          <TouchableOpacity onPress={previousSong}>
            <AntDesign
              name="stepbackward"
              size={40}
              color={styles.actions.color}
            />
          </TouchableOpacity>
          {pauseMusic && (
            <TouchableOpacity onPress={playSond}>
              <AntDesign
                name="caretright"
                size={50}
                color={styles.actions.color}
              />
            </TouchableOpacity>
          )}
          {!pauseMusic && (
            <TouchableOpacity onPress={stop}>
              <AntDesign name="pause" size={50} color={styles.actions.color} />
            </TouchableOpacity>
          )}

          <TouchableOpacity onPress={nextSong}>
            <AntDesign
              name="stepforward"
              size={40}
              color={styles.actions.color}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Icon actions */}
      <Actions />
    </View>
  );
};
