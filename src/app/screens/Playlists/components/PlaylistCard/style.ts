import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes/index';

export default StyleSheet.create({
    container: {
        width: '45%',
        height: 160,
        marginHorizontal: 8,
        marginVertical: 10
    },
    add: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: theme().text,
        backgroundColor: theme(.5).dark,
        borderWidth: 1,
        borderRadius: 10
    },
    cardText: {
        color: theme().text,
        fontSize: 15,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 150,
        borderWidth: 1,
        borderColor: theme().text,
        borderRadius: 10,
        resizeMode: 'cover'
    }
});