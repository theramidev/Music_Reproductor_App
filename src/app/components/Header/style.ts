import {theme} from '../../../assets/themes';
import {StylesHeader} from './interfaces/styles';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

const colorText = new DynamicValue(theme().dark, theme().light);

const styles: StylesHeader = {
  container: {
    position: 'relative',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scroll: {},
  contentText: {
    width: '70%',
  },
  text: {
    color: colorText,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  back: {
    position: 'absolute',
    left: 10,
    color: colorText,
  },
  icon: {
    position: 'absolute',
    right: 15,
    color: colorText,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
