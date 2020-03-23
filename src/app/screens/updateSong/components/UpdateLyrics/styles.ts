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
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
