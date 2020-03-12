import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { getPlaylists } from '../../redux/actions/playlistActions';
import Modal from 'react-native-modal';

import { Header } from '../../components/Header';
import { ListOfPlaylists } from './components/ListOfPlaylists';
import { Text } from 'react-native';
import { ContentModalCreate } from './components/ContentModalCreate';

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
                    <ContentModalCreate />
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
    getPlaylists
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistsScreen);
