import React, {Component} from 'react';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import {Options} from './components/Options';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import { Button } from 'react-native';

export default class Settings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  openPicker = async () => {
    try {
      const pick: DocumentPickerResponse = await DocumentPicker.pick({
        type: [DocumentPicker.types.images]
      });
      console.log(pick);
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('Picker canceled');
      }

      console.error('Error Document Pick: ', error);
    }
  }

  render() {
    return (
      <BackgroundLayout>
        <Header navigation={this.props.navigation} title="Configuración" />
        <Button title="Prueba" onPress={this.openPicker} />
        <Options />
      </BackgroundLayout>
    );
  }
}
