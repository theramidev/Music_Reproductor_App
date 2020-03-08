import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesProgress} from '../../interfaces/styles';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesProgress = {
  container: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderTopColor: '#939393',
    borderWidth: 1,
    backgroundColor: new DynamicValue('white', '#131313'),
    alignItems: 'center',
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
    marginHorizontal: 20,
    marginTop: 10,
    color: colorText,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
