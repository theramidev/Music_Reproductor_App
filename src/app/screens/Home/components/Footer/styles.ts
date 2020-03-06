import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesFooter} from '../../interfaces/styles';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesFooter = {
  container: {
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderTopColor: '#939393',
    borderWidth: 1,
    backgroundColor: new DynamicValue('white', '#131313'),
    alignItems: 'center',
  },
  image: {width: 40, height: 40, borderRadius: 50},
  music: {
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    flexDirection: 'column',
    marginLeft: 5,
    marginRight: 10,
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
  },
  icon: {
    marginRight: 15,
    color: new DynamicValue('black', 'white'),
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
