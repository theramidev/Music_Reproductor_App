import React, { Component } from 'react';

import { IProps } from './interfaces/Props';
import { IState } from './interfaces/State';
import { connect } from 'react-redux';
import { 
    deletePlaylist, 
    updatePlaylist, 
    cleanCurrentPlaylist, 
    getCurrentPLaylist, 
    getPlaylistSongs, 
    addAndDeleteSongsOfPLaylist
} from '../../redux/actions/playlistActions';
import { getSongs } from '../../redux/actions/musicActions';
import { ShowToast } from '../../../utils/toast';
import { DocumentPickerResponse } from 'react-native-document-picker';
import { withTranslation } from 'react-i18next';

import { Header } from '../../components/Header';
import { BackgroundLayout } from '../../components/BackgroundLayout';
import { MPlaylist } from '../../models/playlist.model';
import { PlaylistInfo } from './components/PlaylistInfo';
import { ModalDelete } from './components/ModalDelete';
import { ModalPlaylist } from '../../components/ModalPlaylist';
import { ModalAdd } from './components/ModalAdd';
import { ListOfMusic } from '../../components/ListOfMusic';

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
        const { playListId } = this.state.playlist;
        this.props.getCurrentPLaylist(playListId);
        this.props.getSongs();
        this.props.getPlaylistSongs(playListId);
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
        this.setState({isAddVisible: true})
    }

    deletePlaylist = () => {
        this.setState({isDeleteVisible: false});
        this.props.navigation.goBack();
        this.props.deletePlaylist(this.state.playlist.playListId);
        ShowToast(this.props.t('deleteMessage'));
    }

    editPlaylist = async (picker: DocumentPickerResponse | null, playlistName: string) => {
        const { playListId } = this.state.playlist;
        this.props.updatePlaylist(playListId, playlistName, picker);
    }

    addSongsToPLaylist = (songsAdd: string[], songsDelete: string[]) => {
        this.props.addAndDeleteSongsOfPLaylist(
            this.state.playlist.playListId,
            songsAdd,
            songsDelete
        );
    }

    render() {
        return(
            <BackgroundLayout>
                <Header title={this.state.headerTitle} navigation={this.props.navigation} />

                <PlaylistInfo 
                    playlist={this.props.playlistReducer.currentPlaylist} 
                    quantitySongs={0}
                    onAdd={this._onAdd}
                    onDelete={this._onDelete}
                    onEdit={this._onEdit}
                />

                <ListOfMusic 
                    navigate={this.props.navigation.navigate}
                    songs={this.props.playlistReducer.playlistSongs}
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

                <ModalAdd 
                    isVisible={this.state.isAddVisible}
                    onClose={() => this.setState({isAddVisible: false})}
                    onAdd={this.addSongsToPLaylist}
                    songs={this.props.musicReducer.listSongs}
                    oldSongs={this.props.playlistReducer.playlistSongs}
                />
                
            </BackgroundLayout>
        )
    }
}

const mapStateToProps = ({playlistReducer, musicReducer}: any) => {
    return {
        playlistReducer,
        musicReducer
    }
}

const mapDispatchToProps = {
    deletePlaylist,
    updatePlaylist,
    cleanCurrentPlaylist,
    getCurrentPLaylist,
    getSongs,
    getPlaylistSongs,
    addAndDeleteSongsOfPLaylist
}

export default connect<any>(mapStateToProps, mapDispatchToProps)(withTranslation('PlaylistSongs')(PlaylistSongsScreen));