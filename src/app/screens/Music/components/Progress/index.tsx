import React, {useState, useEffect} from 'react';
import {Slider, Text, View, TouchableOpacity} from 'react-native';
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
  getCurrentTrack,
} from 'react-native-track-player';
import {getDuration} from '../../../../util/duration';
import {Actions} from '../Actions';

export const Progress = ({duration, updateMusic}: any) => {
  const [position, setPosition] = useState(0);
  const [pauseMusic, setPauseMusic] = useState(false);
  const styles = useDynamicStyleSheet(dynamicStyles);

  useEffect(() => {
    var interval = setInterval(() => {
      getPosition().then(seg => {
        setPosition(+seg * 1000);
      });
    }, 700);

    TrackPlayer.addEventListener('playback-state', (data: {state: number}) => {
      data.state === 2 ? setPauseMusic(true) : setPauseMusic(false);
    });

    return () => {
      clearInterval(interval);
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
    await skipToPrevious();
    /* const id: string = await getCurrentTrack();
    await updateMusic(id); */
  };

  const nextSong = async () => {
    await skipToNext();
    /* const id: string = await getCurrentTrack();
    await updateMusic(id); */
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
