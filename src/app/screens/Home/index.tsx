import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';
import styles from './style';

import { IState } from './interfaces/State';
import { IProps } from './interfaces/Props';

class HomeScreen extends Component<IProps, IState> {

    render() {
        return(
            <ScrollView style={styles.container}>
                <Text style={styles.text}>HomeScreen</Text>
            </ScrollView>
        )
    }
}

export default HomeScreen;