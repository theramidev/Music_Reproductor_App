import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesListOfMusic} from '../../interfaces/styles';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesListOfMusic = {
  container: {
    flex: 1,
    paddingBottom: 62,
  },
  item: {
    paddingHorizontal: 10,
    position: 'relative',
    marginBottom: 10,
    marginHorizontal: 10,
    borderBottomColor: new DynamicValue(theme(0.3).dark, theme().text),
    borderBottomWidth: 1,
    paddingBottom: 5,
    flexDirection: 'row',
  },
  image: {width: 50, height: 50, borderRadius: 5},
  info: {
    flexDirection: 'column',
    marginLeft: 8,
    alignContent: 'center',
  },
  title: {
    color: colorText,
    fontSize: 15,
  },
  group: {
    color: colorText,
    fontSize: 10,
    marginTop: 5,
  },
  icon: {
    position: 'absolute',
    right: 10,
    top: 5,
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
