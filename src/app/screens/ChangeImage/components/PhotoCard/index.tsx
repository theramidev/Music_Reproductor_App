import React, { FC } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { IProps } from './PropsInterface';
import styles from './style';
import IconMa from 'react-native-vector-icons/MaterialIcons';

export const PhotoCard: FC<IProps> = ({mode, onPress, wallpaperPath, onDelete}) => {

    const press = () => {
        if (mode === 'add' || mode === 'default') {
            onPress(mode);
            return;
        }

        onPress(wallpaperPath)
    }

    const deleteWallpaper = () => {
        if (onDelete) {
            onDelete(wallpaperPath);
        }
    }

    return(
        <View style={styles.container}>
            {
                mode === 'photo' &&
                <TouchableOpacity style={styles.delete} onPress={deleteWallpaper}>
                    <IconMa name="delete" size={20} color="white" />
                </TouchableOpacity>
            }
            <TouchableOpacity onPress={press}>
                {
                    mode == 'add' || mode == 'default' ? 
                    <View style={styles.add}>
                        {
                            mode === 'add' ? 
                            <IconMa name="add" size={50} color="white" /> :
                            <Text style={styles.textDefault}>Por defecto</Text>
                        }
                    </View> : 
                    <Image 
                        source={{uri: `file://${wallpaperPath}`}}
                        style={styles.image}
                    />
                }
            </TouchableOpacity>
        </View>
    );
}