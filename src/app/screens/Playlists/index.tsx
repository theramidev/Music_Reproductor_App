import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { getPlaylists, createPlaylist } from '../../redux/actions/playlistActions';
import Modal from 'react-native-modal';

import { Header } from '../../components/Header';
import { ListOfPlaylists } from './components/ListOfPlaylists';
import { ContentModalCreate } from './components/ContentModalCreate';
import { DocumentPickerResponse } from 'react-native-document-picker';

class PlaylistsScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            isModalVisible: false
        }
    }

    componentDidMount() {
        this.props.getPlaylists();
    }

    closeModal = () => this.setState({isModalVisible: false});

    createPlaylist = () => {
        console.log('Created!');
        this.setState({isModalVisible: true});
    }

    _onCreate = (image: DocumentPickerResponse | null, playlistName: string) => {
        this.props.createPlaylist(image, playlistName);
    }

    render() {
        return(
            <BackgroundLayout>
                <Header 
                    title="Listas de reproducción" 
                    navigation={this.props.navigation} 
                />

                <ListOfPlaylists 
                    navigation={this.props.navigation}
                    playlists={this.props.playlistReducer.data.playlists}
                    onCreate={this.createPlaylist}
                />

                <Modal 
                    isVisible={this.state.isModalVisible}
                    onBackButtonPress={this.closeModal}
                    onBackdropPress={this.closeModal}
                    hasBackdrop={true}
                    useNativeDriver={true}
                    backdropOpacity={0.3}
                    animationIn="slideInUp"
                    style={{margin: 0, position: 'absolute', bottom: 0, width: '100%'}}
                >
                    <ContentModalCreate 
                        onClose={this.closeModal}
                        onCreate={this._onCreate}
                    />
                </Modal>
            </BackgroundLayout>
        )
    }
}

const mapStateToProps = ({playlistReducer}: any) => {
    return {
        playlistReducer
    }
}

const mapDispatchToProps = {
    getPlaylists,
    createPlaylist
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsScreen);
