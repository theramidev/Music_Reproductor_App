import { StyleSheet } from "react-native";
import { theme } from "../../../../../assets/themes";

export default StyleSheet.create({
    photosContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    modalImage: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        resizeMode: 'cover',
        width: '100%',
        height: '104%'
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    button: {
        backgroundColor: theme().text,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textButton: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    }
});