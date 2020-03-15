import React, {FC, useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import AutoScrolling from 'react-native-auto-scrolling';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import dynamicStyles from './styles';
import {IProps} from './interfaces/Props';
import TrackPlayer, {pause, play, skipToNext} from 'react-native-track-player';
import {
  changeToRandomMode,
  changeToLineMode,
} from '../../redux/actions/musicActions';

const FooterMusic: FC<any> = (props: IProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {title, author} = props.musicReducer.current;
  const [pauseMusic, setPauseMusic] = useState(true);

  useEffect(() => {
    var playbackState = TrackPlayer.addEventListener(
      'playback-state',
      (data: {state: number}) => {
        data.state === 2 ? setPauseMusic(true) : setPauseMusic(false);
      },
    );

    return () => {
      playbackState.remove();
    };
  }, []);

  const goToMusic = () => {
    props.navigation.navigate('Music', {
      item: props.musicReducer.current,
      songs: props.musicReducer.listSongs,
    });
  };

  const stop = async () => {
    await pause();
    setPauseMusic(true);
  };

  const playSond = async () => {
    await play();
    setPauseMusic(false);
  };

  const nextSong = async () => {
    try {
      await skipToNext();
    } catch (err) {
      if (err.toString() === 'Error: There is no tracks left to play') {
        const data = await AsyncStorage.getItem('@Mode');
        const mode = data || 'RANDOM';

        if (mode === 'RANDOM') {
          await props.changeToRandomMode();
        } else {
          await props.changeToLineMode();
        }

        await skipToNext();
      }
    }
  };

  if (Object.keys(props.musicReducer.current).length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No se encontraron canciones</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={goToMusic} style={styles.music}>
        <Image
          style={styles.image}
          source={{
            uri:
              'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Green_Day_-_American_Idiot_album_cover.png/220px-Green_Day_-_American_Idiot_album_cover.png',
          }}
        />

        <View style={styles.info}>
          {title.length <= 24 && <Text style={styles.title}>{title}</Text>}
          {title.length > 24 && (
            <AutoScrolling>
              <Text style={styles.title}>{title}</Text>
            </AutoScrolling>
          )}
          <Text style={styles.group}>{author}</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.options}>
        {pauseMusic && (
          <TouchableOpacity onPress={playSond}>
            <Entypo
              style={styles.icon}
              name="controller-play"
              size={27}
              color={styles.icon.color}
            />
          </TouchableOpacity>
        )}
        {!pauseMusic && (
          <TouchableOpacity onPress={stop}>
            <AntDesign
              name="pause"
              size={27}
              style={styles.icon}
              color={styles.icon.color}
            />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={nextSong}>
          <Entypo
            style={styles.icon}
            name="controller-next"
            size={27}
            color={styles.icon.color}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = ({musicReducer}: any) => {
  return {
    musicReducer,
  };
};

const mapDispatchToProps = {
  changeToRandomMode,
  changeToLineMode,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(FooterMusic);
