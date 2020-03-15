import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import AutoScrolling from 'react-native-auto-scrolling';

export const PlaylistCard: FC<IProps> = ({mode, playlist, onCreate, title, navigation}) => {

    const goToPlaylistSongs = () => navigation.navigate('PlaylistSongs', {playlist});

    return(
        <View style={styles.container}>
            {
                mode === 'add' && 
                <TouchableOpacity onPress={onCreate}>
                    <View style={styles.add}>
                        <IconMa name="add" size={50} color="white" />
                    </View>
                </TouchableOpacity>

            }
            {
                mode === 'playlist' &&
                <TouchableOpacity onPress={goToPlaylistSongs}>
                    <Image style={styles.image}
                        source={
                            playlist?.image ? {uri: 'file://'+playlist.image} :
                            require('../../../../../assets/images/music_notification.png')
                        }
                    />
                </TouchableOpacity>
            }
            {
                playlist && playlist.name.length > 20 ?
                <AutoScrolling>
                    <Text style={styles.cardText}>
                        {playlist.name}
                    </Text>
                </AutoScrolling> :
                <Text style={styles.cardText}>
                    {
                        playlist ? playlist.name : title
                    }
                </Text>
            }
        </View>
    )
}