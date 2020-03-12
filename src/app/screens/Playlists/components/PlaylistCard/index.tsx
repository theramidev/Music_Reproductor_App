import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import AutoScrolling from 'react-native-auto-scrolling';

export const PlaylistCard: FC<IProps> = ({mode, title}) => {
    
    return(
        <View style={styles.container}>
            <TouchableOpacity>
                {
                    mode === 'add' && 
                    <View style={styles.add}>
                        <IconMa name="add" size={50} color="white" />
                    </View>

                }
            </TouchableOpacity>
            {
                title.length > 20 ?
                <AutoScrolling>
                    <Text style={styles.cardText}>
                        {title}
                    </Text>
                </AutoScrolling> :
                <Text style={styles.cardText}>
                    {title}
                </Text>
            }
        </View>
    )
}