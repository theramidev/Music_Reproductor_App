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
import {ListOfMusic} from './components/ListOfMusic';
import {BackgroundLayout} from '../../components/BackgroundLayout';

class HomeScreen extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.getSongs();
  }

  render() {
    const {navigation} = this.props;
    return (
      <BackgroundLayout>
        <Header navigate={navigation.navigate} />

        <Sections />

        <ListOfMusic />

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

export default connect<any>(mapStateToProps, mapDispatchToProps)(HomeScreen);
