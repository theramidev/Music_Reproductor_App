import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesSections} from '../../interfaces/styles';

const styles: StylesSections = {
  content: {
    backgroundColor: new DynamicValue(theme().light, theme(0.9).dark),
    padding: 10,
    paddingTop: 0,
  },
  container: {
    height: '100%',
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    color: new DynamicValue(theme().dark, theme().light),
  },
  iconText: {
    color: new DynamicValue(theme().dark, theme().light),
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
