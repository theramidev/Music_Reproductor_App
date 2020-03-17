import {theme} from '../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesListOfMusic} from './interfaces/Style';

const colorText = new DynamicValue(theme().text, theme().light);
const backgroundActions = new DynamicValue(theme().light, theme(0.9).dark);

const styles: StylesListOfMusic = {
  container: {
    flex: 1,
    paddingBottom: 62,
  },
  containerItem: {
    position: 'relative',
    flexDirection: 'row',
    width: '100%',
  },
  item: {
    paddingHorizontal: 10,
    position: 'relative',
    paddingBottom: 5,
    paddingTop: 5,
    flexDirection: 'row',
  },
  image: {width: 50, height: 50, borderRadius: 5},
  info: {
    flexDirection: 'column',
    marginLeft: 8,
    alignContent: 'center',
    width: '80%',
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
    top: 20,
    zIndex: 10,
  },

  actions: {
    backgroundColor: backgroundActions,
    borderRadius: 10,
  },
  actionsText: {
    color: colorText,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
