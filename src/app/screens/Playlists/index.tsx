import React, { Component } from 'react';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { Header } from '../../components/Header';
import { IProps } from './interfaces/Props';
import { ListOfPlaylists } from './components/ListOfPlaylists';

class PlaylistsScreen extends Component<IProps, {}> {

    render() {
        return(
            <BackgroundLayout>
                <Header 
                    title="Listas de reproducción" 
                    navigation={this.props.navigation} 
                />

                <ListOfPlaylists />
            </BackgroundLayout>
        )
    }
}

export default PlaylistsScreen;
