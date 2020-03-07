import React, { Component } from 'react';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { Header } from '../../components/Header';

class ReproductionsScreen extends Component<IProps, IState> {

    render() {
        return(
            <BackgroundLayout>
                <Header 
                    navigation={this.props.navigation}
                />
            </BackgroundLayout>
        )
    }
}

export default ReproductionsScreen;