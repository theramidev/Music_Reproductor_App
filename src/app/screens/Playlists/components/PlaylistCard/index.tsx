import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import AutoScrolling from 'react-native-auto-scrolling';

export const PlaylistCard: FC<IProps> = ({mode, title, image = null, onCreate}) => {
    
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
                <TouchableOpacity>
                    <Image style={styles.image}
                        source={
                            image ? {uri: 'file://'+image} :
                            require('../../../../../assets/images/music_notification.png')
                        }
                    />
                </TouchableOpacity>
            }
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