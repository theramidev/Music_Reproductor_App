import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';

export const stataticStyle = StyleSheet.create({
    container: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        height: 300
    },
    right: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    left: {
        width: '45%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 130,
        height: 130,
        resizeMode: 'cover',
        borderRadius: 10
    },
    name: {
        color: theme().text,
        fontSize: 20,
        fontWeight: 'bold'
    },
    created: {
        color: theme().text,
        fontSize: 15,
    },
    songs: {
        color: theme().text,
        fontSize: 15,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 100,
        width: '100%',
        marginTop: 25
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        
    }
});

export const dynamicStyles = new DynamicStyleSheet({
    colorText: {
        color: new DynamicValue(theme().text, theme().light)
    }
});