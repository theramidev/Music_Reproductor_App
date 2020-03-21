import {theme} from '../../../assets/themes';
import {StylesInput} from './interfaces/styles';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesInput = {
  input: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicValue('#F3F3F3', theme().text),
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginBottom: 20,
  },
  label: {
    color: colorText,
    fontSize: 15,
    fontWeight: 'bold',
  },
  search: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 0,
    backgroundColor: new DynamicValue(theme(0.0).text, theme().text),
    color: colorText,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
