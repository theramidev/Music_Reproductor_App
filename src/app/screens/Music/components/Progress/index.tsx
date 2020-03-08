import React, {Fragment, useState, useEffect} from 'react';
import {Slider, Text, View, TouchableOpacity} from 'react-native';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import dynamicStyles from './style';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import TrackPlayer, {
  getPosition,
  seekTo,
  pause,
  play,
} from 'react-native-track-player';
import {getDuration} from '../../../../util/duration';

export const Progress = ({duration}: any) => {
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
      TrackPlayer.remove('playback-state');
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

  return (
    <Fragment>
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
          <Entypo
            name="controller-jump-to-start"
            size={50}
            color={styles.actions.color}
          />
          {pauseMusic && (
            <TouchableOpacity onPress={playSond}>
              <FontAwesome5
                name="play"
                size={50}
                color={styles.actions.color}
              />
            </TouchableOpacity>
          )}
          {!pauseMusic && (
            <TouchableOpacity onPress={stop}>
              <FontAwesome5
                name="pause"
                size={50}
                color={styles.actions.color}
              />
            </TouchableOpacity>
          )}

          <Entypo
            name="controller-next"
            size={50}
            color={styles.actions.color}
          />
        </View>
      </View>
    </Fragment>
  );
};
