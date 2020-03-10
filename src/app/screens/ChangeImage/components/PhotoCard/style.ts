import { StyleSheet } from "react-native";
import { theme } from "../../../../../assets/themes";

export default StyleSheet.create({
    container: {
        width: '45%',
        height: 250,
        margin: 8,
        position: 'relative'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        position: 'relative'
    },
    add: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme(.5).text,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: theme().text
    },
    delete: {
        position: 'absolute',
        zIndex: 1,
        bottom: 3,
        right: 3,
        backgroundColor: theme(.8).text,
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
});