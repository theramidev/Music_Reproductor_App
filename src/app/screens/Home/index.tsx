import React, {Component} from 'react';
import {
  Image,
  Animated,
  View,
  SafeAreaView,
  BackHandler,
  Text,
  NativeEventSubscription,
  Alert,
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
import {ListOfMusic} from '../../components/ListOfMusic';
import {ListOfDirs} from '../../components/ListOfDirs';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import style from './style';
import FooterMusic from '../../components/FooterMusic';
import {Loading} from '../../components/Loading';
import {withNavigationFocus} from 'react-navigation';
import { withTranslation } from 'react-i18next';

class HomeScreen extends Component<IProps, IState> {
  private backHandlerEvent: any = null;

  constructor(props: any) {
    super(props);
    this.state = {
      list: 'SONGS',
    };
  }

  async componentDidMount() {
    this.backHandlerEvent = BackHandler.addEventListener(
      'hardwareBackPress',
      async () => {
        if (this.props.isFocused) {
          Alert.alert(
            this.props.t("alertTitle"),
            this.props.t("alertMessage"),
            [
              {
                text: this.props.t("alertCancel"),
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: this.props.t("alertOk"),
                onPress: () => BackHandler.exitApp(),
              },
            ],
            {
              cancelable: false,
            },
          );
          return true;
        }
      },
    );

    this.props.getSongs();
    this.props.getCurrentWallpaper();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backHandlerEvent);
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
            {this.state.list === 'SONGS' && (
              <ListOfMusic
                songs={listSongs}
                updateFavorite={this.props.updateFavorite}
                deleteSong={this.props.deleteSong}
                navigate={navigation.navigate}
                paddingBottom={
                  Object.keys(this.props.musicReducer.current).length === 0
                    ? 170
                    : 230
                }
                refreshing={this.props.musicReducer.refreshing}
                onRefresh={this.props.refreshListSong}
                onChangeList={list => this.setState({list})}
                withDir={true}
              />
            )}
            {this.state.list === 'DIRS' && (
              <ListOfDirs
                songs={this.props.musicReducer.listSongs}
                navigation={this.props.navigation}
                onChangeList={list => this.setState({list})}
              />
            )}
          </>
        )}

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
