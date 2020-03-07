import React, { Component } from 'react';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { Header } from '../../components/Header';
import { ListOfMusic } from '../../components/ListOfMusic';
import { MSong } from '../../models/song.model';

class ReproductionsScreen extends Component<IProps, IState> {

    render() {
        const songs: MSong[] = [
            {
                album: 'dada',
                author: 'dasds',
                cover: 'dadas',
                duration: 15,
                genre: 'dad',
                id: '51612',
                isFavorite: false,
                lyrics: '',
                path: '',
                title: 'My Title'
            }
        ]
        return(
            <BackgroundLayout>
                <Header 
                    navigation={this.props.navigation}
                    title="Recientes"
                />

                <ListOfMusic songs={songs} />
            </BackgroundLayout>
        )
    }
}

export default ReproductionsScreen;