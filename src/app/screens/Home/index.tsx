import React, {Component, Fragment} from 'react';
import {ScrollView} from 'react-native';

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

  render() {
    const {navigation} = this.props;
    return (
      <Fragment>
        <BackgroundLayout>
          <Header navigate={navigation.navigate} />

          <Sections />

          <ScrollView>
            <ListOfMusic />
          </ScrollView>

          <Footer />
        </BackgroundLayout>
      </Fragment>
    );
  }
}

export default HomeScreen;
