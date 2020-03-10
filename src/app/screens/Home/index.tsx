import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getSongs,
  activateTrackPlayer,
  getDuration,
} from '../../redux/actions/fileActions';
import { getCurrentWallpaper } from '../../redux/actions/wallpaperActions';

import {IState} from './interfaces/State';
import {IProps} from './interfaces/Props';
import {Header} from './components/Header';
import {Sections} from './components/Sections';
import {Footer} from './components/Footer';
import {ListOfMusic} from '../../components/ListOfMusic';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Image} from 'react-native';
import style from './style';

class HomeScreen extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    const {getSongs} = this.props;
    getSongs();
    this.props.getCurrentWallpaper();
  }

  render() {
    const {navigation, fileReducer} = this.props;
    const {
      data: {songs},
    } = fileReducer;

    return (
      <BackgroundLayout>
        {
          this.props.wallpaperReducer.data.currentWallpaper &&
          <Image
            source={{
              uri:
                this.props.wallpaperReducer.data.currentWallpaper,
            }}
            style={style.backgroundImage}
          />
        }

        <Header navigate={navigation.navigate} />

        <Sections navigation={this.props.navigation} />

        <ListOfMusic songs={songs} />

        <Footer />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({fileReducer, wallpaperReducer}: any) => {
  return {
    fileReducer,
    wallpaperReducer
  };
};

const mapDispatchToProps = {
  getSongs,
  activateTrackPlayer,
  getDuration,
  getCurrentWallpaper
};

// eslint-disable-next-line prettier/prettier
export default connect<any>(mapStateToProps, mapDispatchToProps)(HomeScreen);
