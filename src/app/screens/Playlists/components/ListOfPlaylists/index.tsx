import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';

import { PlaylistCard } from '../PlaylistCard';

export const ListOfPlaylists: FC<IProps> = ({navigation, playlists, onCreate}) => {

    return(
        <ScrollView>
            <View style={styles.container}>
                <PlaylistCard mode="add" title="Crear nueva lista" onCreate={onCreate} navigation={navigation} />
                {
                    playlists.map((playlist, i) => {
                        return(
                            <PlaylistCard key={i}
                                mode="playlist" 
                                playlist={playlist}
                                navigation={navigation}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}