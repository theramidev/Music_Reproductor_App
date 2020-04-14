import React, {Component} from 'react';
import {
  Image,
  View,
  SafeAreaView
} from 'react-native';
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
import {BackgroundLayout} from '../../components/BackgroundLayout';
import style from './style';
import FooterMusic from '../../components/FooterMusic';
import {Loading} from '../../components/Loading';
import { Tabs } from './components/Tabs';
import {withNavigationFocus} from 'react-navigation';
import { withTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-community/async-storage';
import database from '../../database';
import { ModalRate } from './components/ModalRate';

class HomeScreen extends Component<IProps, IState> {

  constructor(props: any) {
    super(props);
    this.state = {
      list: 'SONGS',
      rateIsVisible: false
    };
  }

  async componentDidMount() {
    const openAppCount: string | null = await AsyncStorage.getItem('openAppCount');
    let openCount: number = Number(openAppCount)
    // console.log('openCount', openCount, 'openAppCount', openAppCount);
    
    if (openCount === 7) {
      setTimeout(() => {
        this.setState({rateIsVisible: true});
      }, 3500);
      openCount++;
      await AsyncStorage.setItem('openAppCount', openCount.toString());
    } else if (openCount < 7) {
      openCount++;
      await AsyncStorage.setItem('openAppCount', openCount.toString());
    }
    


    const clearDatabase = await AsyncStorage.getItem('@clearDatabase');
    if (!clearDatabase) {
      await AsyncStorage.setItem('@clearDatabase', 'no');
    }

    // Open Database
    await database.openDatabase(!clearDatabase);

    this.props.getSongs();

    this.props.getCurrentWallpaper();
  }

  componentWillUnmount() {
    //BackHandler.removeEventListener('hardwareBackPress', this.backHandlerEvent);
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
        {this.props.musicReducer.loadingListSongs ? (
          <SafeAreaView>
            <View style={style.loading}>
              <Loading message="Buscando canciones..." />
            </View>
          </SafeAreaView>
        ) : (
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
        )}

        <ModalRate 
          isVisible={this.state.rateIsVisible}
          onClose={() => this.setState({rateIsVisible: false})}
        />

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

export default withNavigationFocus(
  connect<any, any>(
    mapStateToProps,
    mapDispatchToProps,
  )(withTranslation('Home')(HomeScreen)),
);
