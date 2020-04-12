import { StyleSheet } from "react-native";
import { theme } from '../../../../../assets/themes';

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
        color: theme().light,
        fontWeight: 'bold',
        fontSize: 15
    }
});