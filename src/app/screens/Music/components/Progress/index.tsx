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
} from 'react-native-track-player';
import Actions from '../Actions';
import {getDuration} from '../../../../../utils/duration';

export const Progress = ({duration}: any) => {
  const [position, setPosition] = useState(0);
  const [pauseMusic, setPauseMusic] = useState(false);
  const styles = useDynamicStyleSheet(dynamicStyles);

  useEffect(() => {
    getPosition().then(seg => {
      setPosition(+seg * 1000);
    });

    var interval = setInterval(() => {
      getPosition().then(seg => {
        setPosition(+seg * 1000);
      });
    }, 700);

    var playbackState = TrackPlayer.addEventListener(
      'playback-state',
      (data: {state: number}) => {
        data.state === 2 ? setPauseMusic(true) : setPauseMusic(false);
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
