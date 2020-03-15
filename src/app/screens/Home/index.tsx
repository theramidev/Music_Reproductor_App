import React, {Component} from 'react';
import {Image, ActivityIndicator, View} from 'react-native';
import {connect} from 'react-redux';
import {getCurrentWallpaper} from '../../redux/actions/wallpaperActions';
import {getSongs} from '../../redux/actions/musicActions';

import {
  updateCurrentMusicForId,
  updateListSongs,
  playInRandom,
  playInLine,
} from '../../redux/actions/musicActions';
import {IState} from './interfaces/State';
import {IProps} from './interfaces/Props';
import {Header} from './components/Header';
import {Sections} from './components/Sections';
import {ListOfMusic} from '../../components/ListOfMusic';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import style from './style';
import FooterMusic from '../../components/FooterMusic';
import AsyncStorage from '@react-native-community/async-storage';

class HomeScreen extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    const data = await AsyncStorage.getItem('@Mode');
    const mode = data || 'RANDOM';

    this.props.getCurrentWallpaper();
    await this.props.getSongs();

    if (mode === 'RANDOM') {
      await this.props.playInRandom(false);
    } else {
      await this.props.playInLine(false);
    }
  }

  render() {
    const {navigation, musicReducer} = this.props;
    const {listSongs} = musicReducer;
    // ordena las canciones por orden alfabetico
    /* if (listSongs) {
      listSongs.sort(function(a, b) {
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        return 0;
      });
    }
    console.log(listSongs); */

    if (musicReducer.loadingListSongs) {
      return (
        <View style={style.loading}>
          <ActivityIndicator size="large" color="#00F1DF" />
        </View>
      );
    }

    return (
      <BackgroundLayout>
        {this.props.wallpaperReducer.data.currentWallpaper && (
          <Image
            source={{
              uri: this.props.wallpaperReducer.data.currentWallpaper,
            }}
            style={style.backgroundImage}
          />
        )}

        <Header navigate={navigation.navigate} />

        <Sections navigation={this.props.navigation} />

        <ListOfMusic songs={listSongs} navigate={navigation.navigate} />

        {/* @ts-ignore */}
        <FooterMusic navigation={navigation} />
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
  updateListSongs,
  playInRandom,
  playInLine,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
