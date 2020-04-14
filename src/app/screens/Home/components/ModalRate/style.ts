import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes';

export const staticStyles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 10
    },
    title: {
        color: theme().text,
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    message: {
        color: 'gray',
        marginBottom: 15
    },
    starsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 15
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    button: {
        height: 40,
        width: 80,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    textButton: {
        color: theme().primary,
        fontSize: 15,
        textTransform: 'uppercase'
    }
});