import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes/index';

export default StyleSheet.create({
    container: {
        width: '45%',
        height: 150,
        marginHorizontal: 8,
        marginVertical: 15
    },
    add: {
        height: '100%',
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
        textAlign: 'center',
        marginTop: -1
    }
});