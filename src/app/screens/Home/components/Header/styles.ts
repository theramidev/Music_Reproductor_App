import {theme} from '../../../../../assets/themes';
import {StylesHeader} from '../../interfaces/styles';
import {DynamicStyleSheet, DynamicValue} from 'react-native-dark-mode';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesHeader = {
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: colorText,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  inputIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: new DynamicValue(theme().light, theme().text),
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  searchIcon: {
    padding: 10,
    color: colorText,
  },
  search: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 0,
    backgroundColor: new DynamicValue(theme().light, theme().text),
  },
  settings: {
    width: '12%',
  },
  iconSettings: {
    textAlign: 'center',
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
