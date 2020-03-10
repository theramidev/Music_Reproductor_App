import React, { FC } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './style';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFe from 'react-native-vector-icons/Feather';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconMa from 'react-native-vector-icons/MaterialIcons';

export const Option: FC<IProps> = ({navigation, title, iconLibrary, iconName}) => {
    const styles = useDynamicStyleSheet(dynamicStyles);

    const goToChangeImage = () => {
        navigation.navigate('ChangeImage');
    }

    const renderIcon = () => {
        if (iconName) {
            const iconSize: number = 20;
            switch(iconLibrary) {
                case 'Feather':
                    return <IconFe name={iconName} size={iconSize} color={styles.icon.color} />
                
                case 'FontAwesome':
                    return <IconFa name={iconName} size={iconSize} color={styles.icon.color} />

                case 'Ionicons':
                    return <IconIo name={iconName} size={iconSize} color={styles.icon.color} />
                
                case 'MaterialIcons':
                    return <IconFe name={iconName} size={iconSize} color={styles.icon.color} />
                default: null;
            }
        }

        return null;
    }

    return(
        <TouchableOpacity onPress={goToChangeImage}>
            <View style={styles.container}>
                {renderIcon()}

                <Text style={styles.text}>
                    {title}
                </Text>

                <IconMa name="keyboard-arrow-right" size={25} color={styles.icon.color} />
            </View>
        </TouchableOpacity>
    )
}