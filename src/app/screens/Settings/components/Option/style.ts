import {theme} from '../../../../../assets/themes';
import {StyleOption} from '../../interfaces/Styles';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

const colorText: DynamicValue<string> = new DynamicValue(theme().text, theme().light);

export const styles: StyleOption = {
    container: {
        paddingTop: 20,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        color: colorText,
        fontSize: 16,
        fontWeight: 'bold'
    },
    icon: {
        color: new DynamicValue(theme().dark, theme().light)
    }
}

export default new DynamicStyleSheet(styles);
