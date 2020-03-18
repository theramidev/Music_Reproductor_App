import { StyleSheet } from "react-native";
import { theme } from '../../../assets/themes';

export const staticStyles = StyleSheet.create({
    inputSearch: {
        backgroundColor: theme().text,
        height: 40,
        borderRadius: 10,
        color: theme().light,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '70%'
    },
    notFoundContainer: {
        width: '100%',
        height: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageNotFound: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    },
    textNotFound: {
        color: 'gray',
        fontSize: 20,
        fontWeight: 'bold'
    }
});