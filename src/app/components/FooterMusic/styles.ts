import {theme} from '../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesFooter} from './interfaces/styles';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesFooter = {
  container: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: new DynamicValue('white', '#131313'),
    alignItems: 'center',
  },
  image: {width: 40, height: 40, borderRadius: 50},
  music: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 10,
  },
  info: {
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 10,
    width: '80%',
  },
  title: {
    color: colorText,
    fontSize: 17,
  },
  group: {
    color: colorText,
    fontSize: 10,
  },

  options: {
    flexDirection: 'row',
    marginRight: 10,
  },
  icon: {
    marginRight: 8,
    color: new DynamicValue('black', 'white'),
  },
  scroll: {},
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
