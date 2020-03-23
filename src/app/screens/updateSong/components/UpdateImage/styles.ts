import {theme} from '../../../../../assets/themes';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';
import {StylesUpdateImage} from '../../interfaces/styles';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesUpdateImage = {
  container: {
    marginHorizontal: 15,
  },
  title: {
    color: colorText,
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: theme(0.8).light,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
