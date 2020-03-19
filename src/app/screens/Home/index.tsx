import React, {Component} from 'react';
import {Image, ActivityIndicator, Animated, View} from 'react-native';
import {connect} from 'react-redux';
import {getCurrentWallpaper} from '../../redux/actions/wallpaperActions';
import {getSongs} from '../../redux/actions/musicActions';

import {
  updateCurrentMusicForId,
  updateListSongs,
  playInRandom,
  playInLine,
  updateFavorite,
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
    const data = await AsyncStorage.getItem('@Mode');
    const mode = data || 'RANDOM';
    setTimeout(() => this.spring(), 500);
    this.props.getSongs();
    this.props.getCurrentWallpaper();
    await this.props.getSongs();

    if (mode === 'RANDOM') {
      await this.props.playInRandom(false);
    } else {
      await this.props.playInLine(false);
    }
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

    if (musicReducer.loadingListSongs) {
      return (
        <View style={style.loading}>
          <ActivityIndicator size="large" color="#00F1DF" />
        </View>
      );
    }

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
                style={style.backgroundImage}
              />
            )}

            <Header navigate={navigation.navigate} />

            <Sections navigation={this.props.navigation} />

            <ListOfMusic
              songs={listSongs}
              updateFavorite={this.props.updateFavorite}
              navigate={navigation.navigate}
              paddingBottom={230}
            />

            <FooterMusic navigation={navigation} />
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
  updateListSongs,
  playInRandom,
  playInLine,
  updateFavorite,
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
