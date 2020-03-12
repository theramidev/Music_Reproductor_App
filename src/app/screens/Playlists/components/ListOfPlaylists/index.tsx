import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';

import { PlaylistCard } from '../PlaylistCard';

export const ListOfPlaylists: FC<IProps> = ({navigation, playlists, onCreate}) => {

    return(
        <ScrollView>
            <View style={styles.container}>
                <PlaylistCard mode="add" title="Crear nueva lista" onCreate={onCreate} />
                {
                    playlists.map((playlist, i) => {
                        return(
                            <PlaylistCard key={i}
                                mode="playlist" 
                                title={playlist.name}
                                image={playlist.image}
                            />
                        )
                    })
                }
            </View>
        </ScrollView>
    )
}