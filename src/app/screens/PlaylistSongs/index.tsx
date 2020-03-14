import React, { Component } from 'react';

import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { connect } from 'react-redux';
import { deletePlaylist, updatePlaylist, cleanCurrentPlaylist, getCurrentPLaylist } from '../../redux/actions/playlistActions';
import { ShowToast } from '../../../utils/toast';

import { Header } from '../../components/Header';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { MPlaylist } from '../../models/playlist.model';
import { PlaylistInfo } from './components/PlaylistInfo';
import { ModalDelete } from './components/ModalDelete';
import { ModalPlaylist } from '../../components/ModalPlaylist';
import { DocumentPickerResponse } from 'react-native-document-picker';

class PlaylistSongsScreen extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        const playlist: MPlaylist = props.navigation.getParam('playlist');

        this.state = {
            headerTitle: '',
            playlist,
            isAddVisible: false,
            isDeleteVisible: false,
            isEditVisible: false
        }
    }

    componentDidMount() {
        this.props.getCurrentPLaylist(this.state.playlist.playListId);
    }

    componentWillUnmount() {
        this.props.cleanCurrentPlaylist();
    }

    _onDelete = () => {
        this.setState({isDeleteVisible: true});
    }

    _onEdit = () => {
        this.setState({isEditVisible: true});
    }

    _onAdd = () => {

    }

    deletePlaylist = () => {
        this.setState({isDeleteVisible: false});
        this.props.navigation.goBack();
        this.props.deletePlaylist(this.state.playlist.playListId);
        ShowToast('Lista de reproducción eliminada');
    }

    editPlaylist = async (picker: DocumentPickerResponse | null, playlistName: string) => {
        const { playListId } = this.state.playlist;
        this.props.updatePlaylist(playListId, playlistName, picker);
    }

    render() {
        return(
            <BackgroundLayout>
                <Header title={this.state.headerTitle} navigation={this.props.navigation} />

                <PlaylistInfo 
                    playlist={this.props.playlistReducer.data.currentPlaylist} 
                    quantitySongs={0}
                    onAdd={this._onAdd}
                    onDelete={this._onDelete}
                    onEdit={this._onEdit}
                />

                <ModalDelete
                    isVisible={this.state.isDeleteVisible}
                    onClose={() => this.setState({isDeleteVisible: false})}
                    onAccept={this.deletePlaylist}
                />

                <ModalPlaylist 
                    isVisible={this.state.isEditVisible}
                    onClose={() => this.setState({isEditVisible: false})}
                    onEdit={this.editPlaylist}
                    playlist={this.state.playlist}
                />
                
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
    deletePlaylist,
    updatePlaylist,
    cleanCurrentPlaylist,
    getCurrentPLaylist
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(PlaylistSongsScreen);