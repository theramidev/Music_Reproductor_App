import React, {Component} from 'react';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {connect} from 'react-redux';

import {ListOfMusic} from '../../components/ListOfMusic';
import {Header} from '../../components/Header';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import FooterMusic from '../../components/FooterMusic';

class MusicListScreen extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      title: props.navigation.getParam('title'),
      songs: props.navigation.getParam('songs'),
    };
  }

  render() {
    return (
      <BackgroundLayout>
        <Header
          navigation={this.props.navigation}
          title={this.state.title}
        />

        <ListOfMusic
          navigate={this.props.navigation.navigate}
          songs={this.state.songs}
          paddingBottom={
            Object.keys(this.props.musicReducer.current).length === 0 ? 95 : 155
          }
        />

        <FooterMusic
          // @ts-ignore
          navigation={this.props.navigation}
        />
      </BackgroundLayout>
    );
  }
}

const mapStateToProps = ({musicReducer}: any) => {
  return {
    musicReducer,
  };
};

export default connect(mapStateToProps, {})(MusicListScreen);
