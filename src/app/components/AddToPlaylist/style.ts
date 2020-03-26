import { StyleSheet } from "react-native";
import { theme } from '../../../assets/themes';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';

export const staticStyles = StyleSheet.create({
    container: {
        borderRadius: 10,
        height: 300
    },
    listCardContainer: {
        width: '100%',
        paddingVertical: 12,
        paddingHorizontal: 15
    }
});

export const dynamicStyleSheet = new DynamicStyleSheet({
    container: {
        backgroundColor: new DynamicValue(theme().light, theme().dark)
    },
    texColor: {
        color: new DynamicValue(theme().text, theme().light)
    }
});