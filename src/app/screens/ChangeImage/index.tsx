import React, { Component } from 'react';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { Header } from '../../components/Header';
import { ListOfPhotoCard } from './components/ListOfPhotocard';


class ChangeImageScreen extends Component<IProps, IState> {

    render() {
        return(
            <BackgroundLayout>
                <Header navigation={this.props.navigation} title="Cambiar imagen" />

                <ListOfPhotoCard />
            </BackgroundLayout>
        )
    }
}

export default ChangeImageScreen;