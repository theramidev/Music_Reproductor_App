import React, {Component, Fragment} from 'react';
import {ScrollView, Text} from 'react-native';
import styles from './style';

import {IState} from './interfaces/State';
import {IProps} from './interfaces/Props';
import {Header} from './components/Header';
import {Sections} from './components/Sections';
import {Footer} from './components/Footer';

class HomeScreen extends Component<IProps, IState> {
  render() {
    return (
      <Fragment>
        <Header />

        <Sections />

        <ScrollView style={styles.container}>
          <Text style={styles.text}>HomeScreen</Text>
        </ScrollView>

        <Footer />
      </Fragment>
    );
  }
}

export default HomeScreen;
