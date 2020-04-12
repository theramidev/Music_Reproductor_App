import React, {Component} from 'react';
import {Image, Animated, View, SafeAreaView} from 'react-native';
import {connect} from 'react-redux';

import {getCurrentWallpaper} from '../../redux/actions/wallpaperActions';
import {updateFavorite, deleteSong} from '../../redux/actions/allSongsActions';
import {
  getSongs,
  updateCurrentMusicForId,
  playInRandom,
  playInLine,
  refreshListSong,
} from '../../redux/actions/musicActions';
import {IState} from './interfaces/State';
import {IProps} from './interfaces/Props';
import {Header} from './components/Header';
import {Sections} from './components/Sections';
import {ListOfMusic} from '../../components/ListOfMusic';
import { ListOfDirs } from '../../components/ListOfDirs';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import style from './style';
import FooterMusic from '../../components/FooterMusic';
import {Loading} from '../../components/Loading';
import { Tabs } from './components/Tabs';

class HomeScreen extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      list: 'SONGS'
    }
  }

  async componentDidMount() {
    this.props.getSongs();
    this.props.getCurrentWallpaper();
  }

  render() {
    const {navigation, musicReducer} = this.props;
    const {listSongs} = musicReducer;
    return (
      <BackgroundLayout>
        {this.props.wallpaperReducer.data.currentWallpaper && (
          <Image
            source={{
              uri: this.props.wallpaperReducer.data.currentWallpaper,
            }}
            style={[
              style.backgroundImage,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                height:
                  Object.keys(this.props.musicReducer.current).length === 0
                    ? '103%'
                    : '95%',
              },
            ]}
          />
        )}

          <Header navigate={navigation.navigate} />

          <Sections navigation={this.props.navigation} />
        {
          this.props.musicReducer.loadingListSongs ? 
          <SafeAreaView>
            <View style={style.loading}>
              <Loading message="Buscando canciones..." />
            </View>
          </SafeAreaView> : 
          <>
            <Tabs 
              current={this.props.musicReducer.current}
              listSongs={listSongs}
              navigation={this.props.navigation}
              refreshListSong={this.props.refreshListSong}
              refreshing={this.props.musicReducer.refreshing}
              updateFavorite={this.props.updateFavorite}
            />
          </>
        }


        <FooterMusic
          // @ts-ignore
          navigation={navigation}
        />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({
  fileReducer,
  musicReducer,
  wallpaperReducer,
}: any) => {
  return {
    fileReducer,
    musicReducer,
    wallpaperReducer,
  };
};

const mapDispatchToProps = {
  getSongs,
  getCurrentWallpaper,
  updateCurrentMusicForId,
  playInRandom,
  playInLine,
  updateFavorite,
  deleteSong,
  refreshListSong,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
