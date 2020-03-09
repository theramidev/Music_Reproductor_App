import React, { FC } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';
import IconMa from 'react-native-vector-icons/MaterialIcons';

export const PhotoCard: FC<IProps> = ({mode, onPress}) => {

    const press = () => {
        if (mode === 'add') {
            onPress(null);
            return
        }

        onPress(require('../../../../../assets/images/wallpapers/image_1.jpg'))
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity onPress={press}>
                {
                    mode == 'add' ? 
                    <View style={styles.add}>
                        <IconMa name="add" size={50} color="white" />
                    </View> : 
                    <Image 
                        source={require('../../../../../assets/images/wallpapers/image_1.jpg')}
                        style={styles.image}
                    />
                }
            </TouchableOpacity>
        </View>
    );
}