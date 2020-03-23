import React, {FC, useEffect, useState, Fragment} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {connect} from 'react-redux';
import AutoScrolling from 'react-native-auto-scrolling';
import {useDynamicStyleSheet} from 'react-native-dark-mode';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import dynamicStyles from './styles';
import {IProps} from './interfaces/Props';
import TrackPlayer, {
  pause,
  play,
  skipToNext,
  getState,
  getPosition,
  getQueue,
} from 'react-native-track-player';
import {
  updateListSongsCurrent,
  changeToRandomMode,
  changeToLineMode,
  playInRandom,
  playInLine,
} from '../../redux/actions/musicActions';
import {LoadingComponent} from '../LoadingComponent';

const FooterMusic: FC<any> = (props: IProps) => {
  const styles = useDynamicStyleSheet(dynamicStyles);
  const {title, author, duration, cover} = props.musicReducer.current;
  const [position, setPosition] = useState(0);
  const [pauseMusic, setPauseMusic] = useState(true);

  useEffect(() => {
    getPosition().then(seg => {
      setPosition(+seg * 1000);
    });

    var interval = setInterval(() => {
      getPosition().then(seg => {
        setPosition(+seg * 1000);
      });
    }, 700);

    getState().then(state => {
      if (state === 2) {
        setPauseMusic(true);
      } else if (state === 3) {
        setPauseMusic(false);
      }
    });

    var playbackState = TrackPlayer.addEventListener(
      'playback-state',
      (data: {state: number}) => {
        if (data.state === 2) {
          setPauseMusic(true);
        } else if (data.state === 3) {
          setPauseMusic(false);
        }
      },
    );

    return () => {
      playbackState.remove();
      clearInterval(interval);
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
    const queue = (await getQueue()).length;

    if (queue === 1 || queue === 0) {
      props.updateListSongsCurrent(props.musicReducer.listSongs);

      const data = await AsyncStorage.getItem('@Mode');
      const mode = data || 'RANDOM';
      if (mode === 'RANDOM') {
        props.playInRandom(true);
      } else {
        props.playInLine(true);
      }
    } else {
      await play();
      setPauseMusic(false);
    }
  };

  const nextSong = async () => {
    const queue = (await getQueue()).length;

    if (queue === 1 || queue === 0) {
      props.updateListSongsCurrent(props.musicReducer.listSongs);

      const data = await AsyncStorage.getItem('@Mode');
      const mode = data || 'RANDOM';
      if (mode === 'RANDOM') {
        props.playInRandom(true);
      } else {
        props.playInLine(true);
      }
    } else {
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
    }
  };

  if (Object.keys(props.musicReducer.current).length === 0) {
    return <Fragment />;
  }

  if (props.musicReducer.listSongs.length === 0) {
    return (
      <View style={styles.container}>
        <LoadingComponent />
      </View>
    );
  }

  return (
    <Fragment>
      <View style={styles.container}>
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 1,
            width: Math.floor((position * 100) / duration) + '%',
            backgroundColor: '#00F1DF',
            position: 'absolute',
            top: 0,
          }}
        />
        <TouchableOpacity onPress={goToMusic} style={styles.music}>
          {cover ? (
            <Image
              style={styles.image}
              source={{
                uri: 'file://' + cover,
              }}
            />
          ) : (
            <Image
              style={styles.image}
              source={require('../../../assets/images/music_notification.png')}
            />
          )}

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
    </Fragment>
  );
};

const mapStateToProps = ({musicReducer}: any) => {
  return {
    musicReducer,
  };
};

const mapDispatchToProps = {
  updateListSongsCurrent,
  changeToRandomMode,
  changeToLineMode,
  playInRandom,
  playInLine,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(FooterMusic);
