import React, {Component} from 'react';
import {Text, Image, View} from 'react-native';
import {connect} from 'react-redux';

import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {Header} from '../../components/Header';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {
  updateCurrentMusic,
  updateCurrentMusicForId,
  playInLine,
  playInRandom,
  changeToLineMode,
  changeToRandomMode,
} from '../../redux/actions/musicActions';
import style from './style';
import {Progress} from './components/Progress';
import {isPlay} from '../../../utils/isPlay';
import {destroy} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';

class Music extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    const {
      navigation: {
        state: {params},
      },
      musicReducer,
    } = this.props;
    // @ts-ignore
    const item = params.item;

    // guarda la ultima cancion reproducida
    AsyncStorage.setItem('@LastMusic', JSON.stringify(item));

    this.props.updateCurrentMusic(item);

    if (isPlay(musicReducer.current, item)) {
      return;
    }
    const mode = (await AsyncStorage.getItem('@Mode')) || 'RANDOM';

    destroy();

    // @ts-ignore
    //const songs = params.songs;

    if (mode === 'RANDOM') {
      this.props.playInRandom(true);
    } else {
      this.props.playInLine(true);
    }
  }

  render() {
    const {
      musicReducer,
      navigation: {
        state: {params},
      },
    }: any = this.props;

    const item =
      Object.keys(musicReducer.current).length === 0
        ? params.item
        : musicReducer.current;

    return (
      <BackgroundLayout>
        <Header
          title={item.title}
          navigation={this.props.navigation}
          iconName="settings"
        />

        <View style={style.contentImage}>
          <Image
            style={style.image}
            key={item.id}
            source={{
              uri:
                'https://i.pinimg.com/originals/71/af/1d/71af1d7689eeb346b089aa8d56bcc6b6.jpg',
            }}
          />
          <Text style={style.author}>{item.author}</Text>
          <Text style={style.album}>{item.album}</Text>
        </View>

        <Progress
          duration={item.duration}
          changeToLineMode={this.props.changeToLineMode}
          changeToRandomMode={this.props.changeToRandomMode}
          musicReducer={musicReducer}
        />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({fileReducer, musicReducer}: any) => {
  return {
    musicReducer,
    fileReducer,
  };
};

const mapDispatchToProps = {
  playInLine,
  updateCurrentMusic,
  updateCurrentMusicForId,
  playInRandom,
  changeToLineMode,
  changeToRandomMode,
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(mapStateToProps, mapDispatchToProps)(Music);
