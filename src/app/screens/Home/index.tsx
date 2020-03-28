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
import {BackgroundLayout} from '../../components/BackgroundLayout';
import style from './style';
import FooterMusic from '../../components/FooterMusic';
import {Loading} from '../../components/Loading';

class HomeScreen extends Component<IProps, IState> {
  state = {
    inSplash: true,
    springVal: new Animated.Value(0.8),
    fadeVal: new Animated.Value(1),
    fadePrincipal: new Animated.Value(0),
  };
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    setTimeout(() => this.spring(), 500);
    this.props.getSongs();
    this.props.getCurrentWallpaper();
  }

  spring = () => {
    Animated.sequence([
      Animated.spring(this.state.springVal, {
        toValue: 0.6,
        friction: 7,
        tension: 20,
      }),
      Animated.parallel([
        Animated.spring(this.state.springVal, {
          toValue: 17.5,
          friction: 7,
          tension: 5,
        }),
        Animated.timing(this.state.fadeVal, {
          toValue: 0,
          duration: 300,
        }),
      ]),
    ]).start(() => {
      this.setState({inSplash: false});
      Animated.timing(this.state.fadePrincipal, {
        toValue: 1,
        duration: 300,
      }).start();
    });
  };

  render() {
    const {navigation, musicReducer} = this.props;
    const {listSongs} = musicReducer;

    return (
      <>
        {this.state.inSplash && (
          <View style={style.wrapper}>
            <View style={style.center}>
              <Animated.View
                style={{
                  opacity: this.state.fadeVal,
                  transform: [{scale: this.state.springVal}],
                }}>
                <Image
                  source={require('../../../assets/images/splash.png')}
                  style={style.splashImage}
                />
              </Animated.View>
            </View>
          </View>
        )}
        <Animated.View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{flex: 1, height: '100%', opacity: this.state.fadePrincipal}}>
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

            {!musicReducer.loadingListSongs && (
              <Sections navigation={this.props.navigation} />
            )}

            {musicReducer.loadingListSongs ? (
              <SafeAreaView>
                <View style={style.loading}>
                  <Loading message="Buscando canciones" />
                </View>
              </SafeAreaView>
            ) : (
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
              />
            )}

            <FooterMusic
              // @ts-ignore
              navigation={navigation}
            />
          </BackgroundLayout>
        </Animated.View>
      </>
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
