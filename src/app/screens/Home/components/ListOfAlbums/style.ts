import { StyleSheet } from "react-native";

export const staticStyles = StyleSheet.create({
    cardContainer: {
        width: '50%',
        height: 180,
        alignItems: 'center',
        justifyContent: 'center'
    },
    cardImage: {
        width: 140,
        height: 140,
        resizeMode: 'cover',
        borderRadius: 10
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 15
    }
});