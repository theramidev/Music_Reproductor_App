import React, {Component} from 'react';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from './components/Header';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {Options} from './components/Options';

export default class Settings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const {navigation} = this.props;
    const {goBack} = navigation;

    return (
      <BackgroundLayout>
        <Header goBack={goBack} />

        <Options />
      </BackgroundLayout>
    );
  }
}
