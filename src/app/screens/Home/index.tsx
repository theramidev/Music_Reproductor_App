import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  getSongs,
  activateTrackPlayer,
  getDuration,
} from '../../redux/actions/fileActions';

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
  }

  render() {
    const {navigation, fileReducer} = this.props;
    const {
      data: {songs},
    } = fileReducer;

    return (
      <BackgroundLayout>
        <Image
          source={{
            uri:
              'https://papers.co/wallpaper/papers.co-ad64-starry-night-illust-anime-girl-2-wallpaper.jpg',
          }}
          style={style.backgroundImage}
        />

        <Header navigate={navigation.navigate} />

        <Sections navigation={this.props.navigation} />

        <ListOfMusic songs={songs} />

        <Footer />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({fileReducer}: any) => {
  return {
    fileReducer,
  };
};

const mapDispatchToProps = {
  getSongs,
  activateTrackPlayer,
  getDuration,
};

// eslint-disable-next-line prettier/prettier
export default connect<any>(mapStateToProps, mapDispatchToProps)(HomeScreen);
