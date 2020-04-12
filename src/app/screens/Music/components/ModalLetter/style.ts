import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesModal} from '../../interfaces/styles';

const colorText = new DynamicValue(theme().text, theme(0.8).light);
const backgroundModal = new DynamicValue(theme(0.8).light, theme().text);

const styles: StylesModal = {
  header: {
    position: 'relative',
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  iconHeader: {
    position: 'absolute',
    left: 20,
  },
  textHeader: {
    color: colorText,
    fontSize: 23,
  },
  container: {
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  icon: {
    color: colorText,
  },
  text: {
    color: colorText,
    textAlign: 'center',
    lineHeight: 25,
    fontSize: 16,
  },
  textWarning: {
    color: colorText,
    textAlign: 'center',
    fontSize: 20,
  },
  modalContainer: {
    backgroundColor: backgroundModal,
    borderRadius: 20,
    padding: 10,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
