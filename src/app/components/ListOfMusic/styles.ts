import {theme} from '../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesListOfMusic} from './interfaces/Style';

const colorText = new DynamicValue(theme().text, theme().light);

const styles: StylesListOfMusic = {
  container: {
    flex: 1,
    paddingBottom: 62,
  },
  item: {
    paddingHorizontal: 10,
    position: 'relative',
    marginHorizontal: 10,
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
  },
  image: {width: 50, height: 50, borderRadius: 5},
  info: {
    flexDirection: 'column',
    marginLeft: 8,
    alignContent: 'center',
    width: '77%',
  },
  title: {
    color: colorText,
    fontSize: 15,
    width: '100%',
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
