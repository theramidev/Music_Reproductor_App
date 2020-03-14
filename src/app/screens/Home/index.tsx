import React, {Component} from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import {getCurrentWallpaper} from '../../redux/actions/wallpaperActions';
import {getSongs} from '../../redux/actions/musicActions';

import {
  updateCurrentMusicForId,
  updateListSongs,
} from '../../redux/actions/musicActions';
import {IState} from './interfaces/State';
import {IProps} from './interfaces/Props';
import {Header} from './components/Header';
import {Sections} from './components/Sections';
import {Footer} from './components/Footer';
import {ListOfMusic} from '../../components/ListOfMusic';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import style from './style';

class HomeScreen extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  async componentDidMount() {
    this.props.getCurrentWallpaper();
    await this.props.getSongs();
  }

  render() {
    const {navigation, musicReducer} = this.props;
    const {listSongs} = musicReducer;
    // ordena las canciones por orden alfabetico
    if (listSongs) {
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

        <Footer />
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
};

export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
