import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';

export const staticStyle = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        borderWidth: 1
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        color: 'gray'
    },
    buttonsContainer: {
        flexDirection: 'row',
        marginTop: 15
    },
    button: {
        width: '50%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 15,
        fontWeight: 'bold'
    }
});

export const dynamicStyleSheet = new DynamicStyleSheet({
    container: {
        backgroundColor: new DynamicValue(theme().light, theme().dark),
        borderColor: new DynamicValue('#cdcdcd', theme().text)
    },
    textColor: {
        color: new DynamicValue(theme().text, theme().light)
    }
});