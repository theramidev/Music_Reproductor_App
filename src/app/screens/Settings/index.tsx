import React, {Component} from 'react';
import {BackgroundLayout} from '../../components/BackgroundLayout';
import {Header} from '../../components/Header';
import {IProps} from './interfaces/Props';
import {IState} from './interfaces/State';
import { ListOfOptions } from './components/ListOfOptions';
import { withTranslation } from 'react-i18next';
import i18n from 'i18next';
import AsyncStorage from '@react-native-community/async-storage';

class Settings extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  changeLanguage = async (language: 'es' | 'en') => {
    i18n.changeLanguage(language);
    await AsyncStorage.setItem('currentLanguage', language);
  }

  render() {
    return (
      <BackgroundLayout>
        <Header navigation={this.props.navigation} title={this.props.t('headerTitle')} />

        <ListOfOptions 
          navigation={this.props.navigation}
          onLanguageChange={this.changeLanguage}
        />
      </BackgroundLayout>
    );
  }
}

export default withTranslation('Settings')(Settings);