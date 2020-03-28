import {theme} from '../../../assets/themes';
import {LoadingStyle} from './interfaces/styles';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

const colorText = new DynamicValue(theme(0.5).text, theme(0.5).light);

const styles: LoadingStyle = {
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colorText,
    fontSize: 12,
    fontWeight: 'bold',
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
