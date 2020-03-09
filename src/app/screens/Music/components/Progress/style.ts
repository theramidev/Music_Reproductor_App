import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesProgress} from '../../interfaces/styles';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesProgress = {
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  text: {
    color: colorText,
  },
  bar: {
    marginHorizontal: 10,
    position: 'relative',
  },
  start: {
    color: colorText,
  },
  finish: {
    color: colorText,
  },
  time: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 5,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 50,
    color: colorText,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
