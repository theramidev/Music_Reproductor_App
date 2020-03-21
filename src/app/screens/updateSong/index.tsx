import React, {Component} from 'react';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {Input} from '../../components/Input';
import {UpdateImage} from './components/UpdateImage';

export default class UpdateSongScreen extends Component<IProps, IState> {
  render() {
    return (
      <BackgroundLayout>
        <Header title="Editar cancion" navigation={this.props.navigation} />

        <Input title="Titulo" />
        <Input title="Artista" />
        <Input title="Album" />

        <UpdateImage />
      </BackgroundLayout>
    );
  }
}
