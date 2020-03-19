import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';
import {theme} from '../../../assets/themes';

const styles: any = {
  container: {
    height: '100%',
    paddingTop: 23,
    flex: 1,
    backgroundColor: new DynamicValue(theme().light, theme(0.9).dark),
    position: 'relative',
    zIndex: 0,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
