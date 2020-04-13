import { StyleSheet } from "react-native";
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';
import { theme } from '../../../../../assets/themes';

export const staticStyles = StyleSheet.create({
    cardContainer: {
        width: '100%',
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        marginVertical: 2,
        paddingHorizontal: 10
    },
    cardText: {
        fontSize: 16,
        fontWeight: '700'
    }
});

export const dynamicStyleSheet = new DynamicStyleSheet({
    cardContainer: {
        backgroundColor: new DynamicValue(theme(.2).dark, theme(.2).light)
    },
    colorText: {
        color: new DynamicValue(theme().text, theme().light)
    }
});