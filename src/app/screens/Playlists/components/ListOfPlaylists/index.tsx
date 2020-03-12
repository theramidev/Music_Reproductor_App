import React, { FC } from 'react';
import { ScrollView, View } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';

import { PlaylistCard } from '../PlaylistCard';

export const ListOfPlaylists: FC<IProps> = () => {

    return(
        <ScrollView>
            <View style={styles.container}>
                <PlaylistCard mode="add" title="Crear nueva lista" />
                <PlaylistCard mode="add" title="Crear nueva lista" />
                <PlaylistCard mode="add" title="Crear nueva lista" />
            </View>
        </ScrollView>
    )
}