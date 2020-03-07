import React, {Component} from 'react';
import {Text} from 'react-native';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';

export default class Music extends Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    const {
      navigation: {
        state: {params},
      },
    } = this.props;
    console.log(params);
  }

  render() {
    return <Text>Music screan</Text>;
  }
}
