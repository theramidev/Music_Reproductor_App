import React, { FC, useState, ReactText, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IProps } from './PropsInterface';
import { useDynamicStyleSheet } from 'react-native-dark-mode';
import dynamicStyles from './style';
import IconFa from 'react-native-vector-icons/FontAwesome';
import IconFe from 'react-native-vector-icons/Feather';
import IconIo from 'react-native-vector-icons/Ionicons';
import IconMa from 'react-native-vector-icons/MaterialIcons';
import { Picker } from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage';

export const Option: FC<IProps> = ({onNavigation, title, iconLibrary, iconName, mode = 'navigation', selectData = [], onLanguageChange}) => {
    const styles = useDynamicStyleSheet(dynamicStyles);
    const [selectedValue, setSelectedValue] = useState<| 'en' | 'es'>('es');

    useEffect(() => {
        AsyncStorage.getItem('currentLanguage').then((result: string | null) => {
            if (result) {
                switch(result) {
                    case 'en': setSelectedValue('en'); break;
                    case 'es': setSelectedValue('es'); break;
                    default: setSelectedValue('es'); break;
                }
            }
        });
    }, []);

    const _onChangePicker = (itemValue: ReactText) => {
        const itemText = itemValue.toString();
        if (onLanguageChange) {
            if (itemText === 'es' || itemText === 'en') {
                setSelectedValue(itemText);
                onLanguageChange(itemText);
                return;
            }
        }
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
                    return <IconMa name={iconName} size={iconSize} color={styles.icon.color} />
                default: null;
            }
        }

        return null;
    }

    return(
        <>
            {
                mode === 'navigation' &&
                <TouchableOpacity onPress={onNavigation}>
                    <View style={styles.container}>
                        {renderIcon()}

                        <Text style={styles.text}>
                            {title}
                        </Text>

                        <IconMa name="keyboard-arrow-right" size={25} color={styles.icon.color} />
                    </View>
                </TouchableOpacity> 
            }
            {
                mode === 'select' &&
                <View style={styles.container}>
                    {renderIcon()}

                    {/* <Text style={styles.text}>
                        {title}
                    </Text> */}

                    <Picker
                        selectedValue={selectedValue}
                        onValueChange={_onChangePicker}
                        style={[{width: '80%'}, styles.text]}
                        mode="dropdown"
                    >
                        {
                            selectData.map((item, i) => {
                                return(
                                    <Picker.Item 
                                        key={i}
                                        label={item.label}
                                        value={item.value}
                                    />
                                )
                            })
                        }
                    </Picker>
                </View>
            }
        </>
    )
}