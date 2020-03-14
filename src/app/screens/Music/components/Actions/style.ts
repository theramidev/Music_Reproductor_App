import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesActions} from '../../interfaces/styles';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesActions = {
  container: {
    width: '100%',
    bottom: 0,
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  icon: {
    color: colorText,
  },
  iconActive: {
    color: '#F7DC6F',
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
