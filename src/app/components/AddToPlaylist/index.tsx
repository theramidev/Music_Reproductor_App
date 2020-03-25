import React, { FC } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { IProps } from './PropsInterface';
import { staticStyles, dynamicStyleSheet } from './style';
import { MPlaylist } from '../../models/playlist.model';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import AutoScrolling from 'react-native-auto-scrolling';

export const AddToPlaylist: FC<IProps> = ({isVisible, onClose, playlists, onCreate}) => {

    const dynamicStyles = useDynamicStyleSheet(dynamicStyleSheet);

    const PlaylistCard: FC<{playlist: MPlaylist}> = ({playlist}) => {

        const selectPlaylist = () => {
            onCreate(playlist);
            onClose();
        }

        return(
            <TouchableOpacity style={staticStyles.listCardContainer}
                onPress={selectPlaylist}
            >
                {
                    playlist.name.length > 30 ?
                    <AutoScrolling>
                        <Text style={[{fontSize: 18}, dynamicStyles.texColor]}>
                            {playlist.name}
                        </Text>
                    </AutoScrolling> : 
                    <Text style={[{fontSize: 18}, dynamicStyles.texColor]}>
                        {playlist.name}
                    </Text>
                }
            </TouchableOpacity>
        )
    }

    return(
        <Modal
            isVisible={isVisible}
            hasBackdrop={true}
            backdropOpacity={0.0}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
        >
            <View style={[staticStyles.container, dynamicStyles.container]}>
                <Text style={{fontSize: 12, color: 'gray', marginVertical: 10, marginHorizontal: 10}}>
                    Selecciona una lista
                </Text>
                <FlatList 
                    data={playlists}
                    renderItem={({item}) => <PlaylistCard playlist={item} />}
                    keyExtractor={(item) => item.playListId.toString()}
                />
                
            </View>
        </Modal>
    )
}