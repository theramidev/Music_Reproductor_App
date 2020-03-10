import React, {Component} from 'react';
import {Text, Image, View} from 'react-native';
import {connect} from 'react-redux';

import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {Header} from '../../components/Header';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {activateTrackPlayer} from '../../redux/actions/fileActions';
import {
  updateCurrentMusic,
  updateCurrentMusicForId,
  updateListSongs,
} from '../../redux/actions/musicActions';
import style from './style';
import {Progress} from './components/Progress';
import {getListRamdonSong} from '../../../utils/orderListMusic';
import {MSong} from 'src/app/models/song.model';
import {isPlay} from '../../../utils/isPlay';

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
    if (isPlay(musicReducer.current, item)) {
      return;
    }

    // @ts-ignore
    const songs = params.songs;
    this.props.updateCurrentMusic(item);
    // @ts-ignore
    const listMusics: MSong[] = getListRamdonSong(songs, item);
    this.props.updateListSongs(songs);

    this.props.activateTrackPlayer(listMusics);
  }

  render() {
    const {musicReducer} = this.props;
    const item = musicReducer.current;

    if (Object.keys(item).length === 0) {
      return <Text>empty</Text>;
    }

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
          updateMusic={this.props.updateCurrentMusicForId}
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
  activateTrackPlayer,
  updateCurrentMusic,
  updateCurrentMusicForId,
  updateListSongs,
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(mapStateToProps, mapDispatchToProps)(Music);
