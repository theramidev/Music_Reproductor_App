import {theme} from '../../../../../assets/themes';
import {StylesOptions} from '../../interfaces/styles';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesOptions = {
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomColor: new DynamicValue(theme().text, theme().text),
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: colorText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {width: 50, height: 50, borderRadius: 5},
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
