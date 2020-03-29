import { StyleSheet } from 'react-native';
import { theme } from '../../../assets/themes';
import { DynamicStyleSheet, DynamicValue } from 'react-native-dark-mode';

export const staticStyles = StyleSheet.create({
    options: {
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        borderBottomWidth: 1
    },
    iconOptions: {
        borderRadius: 60,
        padding: 4,
    },
    containerCard: {
        width: '50%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center'
    },
    card: {
        width: '100%',
        height: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
    },
    dirName: {
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        textAlign: 'center',
        marginTop: 1,
        marginBottom: -5
    },
    pathText: {
        fontSize: 12,
    }
});

export const dynamicStyleSheet = new DynamicStyleSheet({
    colorText: {
        color: new DynamicValue(theme().text, theme().light)
    },
    backgroundIconOption: {
        backgroundColor: new DynamicValue(theme(.9).light, theme(.9).text)
    },
    borderColor: {
        borderColor: new DynamicValue('gray', theme().light)
    }
})