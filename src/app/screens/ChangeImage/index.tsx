import React, { Component } from 'react';
import { Text } from 'react-native';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';

class ChangeImageScreen extends Component<IProps, IState> {

    render() {
        return(
            <Text>Hola Change Image Screen</Text>
        )
    }
}

export default ChangeImageScreen;