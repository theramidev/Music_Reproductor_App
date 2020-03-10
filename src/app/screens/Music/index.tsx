import React, {Component} from 'react';
import {Text, Image, View} from 'react-native';
import {connect} from 'react-redux';

import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {Header} from '../../components/Header';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {activateTrackPlayer} from '../../redux/actions/fileActions';
import style from './style';
import {Progress} from './components/Progress';

class Music extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  async componentDidMount() {
    const {
      navigation: {
        state: {params},
      },
    } = this.props;

    // @ts-ignore
    this.props.activateTrackPlayer([{...params.item}]);
  }

  render() {
    const {
      navigation: {
        state: {params},
      },
    } = this.props;
    // @ts-ignore
    const {item} = params;
    return (
      <BackgroundLayout>
        <Header
          title={item.title}
          navigation={this.props.navigation}
          iconName="settings"
        />

        <View style={style.contentImage}>
          <Image
            style={style.image}
            key={item.id}
            source={{
              uri:
                'https://i.pinimg.com/originals/71/af/1d/71af1d7689eeb346b089aa8d56bcc6b6.jpg',
            }}
          />
          <Text style={style.author}>{item.author}</Text>
          <Text style={style.album}>{item.album}</Text>
        </View>

        <Progress duration={item.duration} />
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
  activateTrackPlayer,
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(mapStateToProps, mapDispatchToProps)(Music);
