import { StyleSheet } from "react-native";
import { theme } from "../../../../../assets/themes";

export default StyleSheet.create({
    container: {
        width: '45%',
        height: 250,
        margin: 8
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10
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
    }
});