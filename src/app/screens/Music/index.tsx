import React, {Component} from 'react';
import {Text, Image, View} from 'react-native';
import {connect} from 'react-redux';
import {destroy, getQueue} from 'react-native-track-player';
import AsyncStorage from '@react-native-community/async-storage';
import fs from 'react-native-fs';
import AutoScrolling from 'react-native-auto-scrolling';

import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {
  updateCurrentMusic,
  updateCurrentMusicForId,
  playInLine,
  playInRandom,
  changeToLineMode,
  changeToRandomMode,
  updateListSongsCurrent,
} from '../../redux/actions/musicActions';
import {setSongToRecent} from '../../redux/actions/recentsActions';
import style from './style';
import {Progress} from './components/Progress';
import {isPlay} from '../../../utils/isPlay';
import share from '../../../utils/share';
import {HeaderMusic} from './components/HeaderMusic';
import {MSong} from 'src/app/models/song.model';
import {ShowToast} from '../../../utils/toast';
import {withTranslation} from 'react-i18next';
import {AddToPlaylist} from '../../components/AddToPlaylist';
import {MPlaylist} from '../../models/playlist.model';
import {
  getPlaylists,
  addAndDeleteSongsOfPLaylist,
} from '../../redux/actions/playlistActions';

class Music extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      addToPlaylistVisible: false,
    };
  }

  async componentDidMount() {
    const {
      navigation: {
        state: {params},
      },
      musicReducer,
    } = this.props;
    // @ts-ignore
    const item: MSong = params.item;

    // Obtenemos las listas de reproducción
    this.props.getPlaylists();

    // evalua si la cancion existe en el telefono
    if (!(await fs.exists(item.path))) {
      ShowToast(this.props.t('noSongInSystem'));
      this.props.navigation.goBack();
      return;
    }

    // guarda la ultima cancion reproducida
    AsyncStorage.setItem('@LastMusic', JSON.stringify(item));

    this.props.updateCurrentMusic(item);

    if (isPlay(musicReducer.current, item) && (await getQueue()).length > 0) {
      return;
    }
    const mode = (await AsyncStorage.getItem('@Mode')) || 'RANDOM';

    this.props.setSongToRecent(item.id);
    destroy();

    // @ts-ignore
    const songs = params.songs;
    await this.props.updateListSongsCurrent(songs);

    if (mode === 'RANDOM') {
      this.props.playInRandom(true);
    } else {
      this.props.playInLine(true);
    }
  }

  cutText = (text: string, limit: number, styleText?: any) => {
    if (text.length > limit) {
      return (
        // eslint-disable-next-line react-native/no-inline-styles
        <AutoScrolling style={{height: 30, width: '80%'}}>
          <Text style={styleText}>{text}</Text>
        </AutoScrolling>
      );
    } else {
      return <Text style={styleText}>{text}</Text>;
    }
  };

  _onShare = async () => {
    share(this.props.musicReducer.current);
  };

  addToPlaylist = (playlist: MPlaylist) => {
    const {current} = this.props.musicReducer;
    this.props.addAndDeleteSongsOfPLaylist(playlist.playListId, [current.id]);
  };

  render() {
    const {
      musicReducer,
      navigation: {
        state: {params},
      },
    }: any = this.props;

    const item: MSong =
      Object.keys(musicReducer.current).length === 0
        ? params.item
        : musicReducer.current;

    return (
      <BackgroundLayout>
        <HeaderMusic
          item={item}
          navigation={this.props.navigation}
          onOpenAddPlaylist={() => this.setState({addToPlaylistVisible: true})}
        />

        <View style={style.contentImage}>
          {item.cover ? (
            <Image
              style={style.image}
              source={{
                uri: 'file://' + item.cover,
              }}
            />
          ) : (
            <Image
              style={[style.image, {backgroundColor: '#838383'}]}
              source={require('../../../assets/images/music_notification.png')}
            />
          )}
          {this.cutText(item.author || '<unknown>', 31, style.author)}
          {this.cutText(item.album || '<unknown>', 55, style.album)}
        </View>

        <Progress
          duration={item.duration}
          changeToLineMode={this.props.changeToLineMode}
          changeToRandomMode={this.props.changeToRandomMode}
          musicReducer={musicReducer}
          onShare={this._onShare}
        />

        <AddToPlaylist
          isVisible={this.state.addToPlaylistVisible}
          onClose={() => this.setState({addToPlaylistVisible: false})}
          onCreate={this.addToPlaylist}
          playlists={this.props.playlistReducer.playlists}
        />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({playlistReducer, musicReducer}: any) => {
  return {
    musicReducer,
    playlistReducer,
  };
};

const mapDispatchToProps = {
  playInLine,
  updateCurrentMusic,
  updateCurrentMusicForId,
  playInRandom,
  changeToLineMode,
  changeToRandomMode,
  updateListSongsCurrent,
  setSongToRecent,
  getPlaylists,
  addAndDeleteSongsOfPLaylist,
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(withTranslation('Music')(Music));
