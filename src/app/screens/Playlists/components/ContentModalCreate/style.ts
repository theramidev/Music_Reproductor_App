import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes';


export const staticStyle = StyleSheet.create({
    container: {
        backgroundColor: theme(.5).dark,
        height: 220,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    left: {
        width: '50%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 15
    },
    right: {
        width: '50%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 15

    },
    photoContainer: {
        borderWidth: 1,
        borderColor: theme(.1).dark,
        borderRadius: 5,
        width: 100,
        height: 100,
        backgroundColor: theme(.5).text,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addPhotoText: {
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center'
    },
    inputLabel: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5
    },
    input: {
        backgroundColor: theme().text,
        borderRadius: 5,
        height: 40,
        color: 'white',
        paddingHorizontal: 10,
        fontSize: 16
    },
    buttonContainer: {
        width: '100%',
        marginTop: 19,
        flexDirection: 'row',
    },
    button: {
        width: '50%',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 17
    },
    buttonAccept: {
        borderStartColor: theme().text,
        borderStartWidth: 1,
        borderTopColor: theme().text,
        borderTopWidth: 2
    },
    buttonCancel: {
        borderEndColor: theme().text,
        borderEndWidth: 1,
        borderTopColor: theme().text,
        borderTopWidth: 2
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    }
});