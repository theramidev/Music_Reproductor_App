import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesSections} from '../../interfaces/styles';

const styles: StylesSections = {
  content: {
    paddingHorizontal: 10,
    paddingTop: 0,
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderColor: '#808B96',
    borderWidth: 1,
    backgroundColor: new DynamicValue(theme().light, theme().text),
    borderRadius: 10,
  },
  icon: {
    justifyContent: 'center',
    alignItems: 'center',
    color: new DynamicValue(theme(0.8).dark, theme().light),
  },
  iconText: {
    color: new DynamicValue(theme(0.8).dark, theme().light),
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
