import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';

export const staticStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingTop: 10,
        height: '100%',
        paddingBottom: 60
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    button: {
        borderWidth: 1,
        height: 35,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    textButton: {
        fontWeight: 'bold'
    },
    inputSearch: {
        backgroundColor: theme().text,
        height: 40,
        borderRadius: 10,
        color: theme().light,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        width: '100%'
    },
    songCardContainer: {
        flexDirection: 'row',
        height: 45,
        borderBottomWidth: 1
    },
    songLeft: {
        width: '90%',
        justifyContent: 'center',
    },
    songRight: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 5
    },
    filterButton: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        height: 40
    },
    buttonsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10
    },
    buttonHeader: {
        alignItems: 'center'
    }
});

export const dynamicStyleSheet = new DynamicStyleSheet({
    container: {
        backgroundColor: new DynamicValue(theme().light, theme(.9).dark)
    },
    texColor: {
        color: new DynamicValue(theme().text, theme().light)
    },
    borderColor: {
        borderColor: new DynamicValue('#cdcdcd', 'gray')
    }
});