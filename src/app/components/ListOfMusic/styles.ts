import {theme} from '../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';
import {StylesListOfMusic} from './interfaces/Style';

const colorText = new DynamicValue(theme().text, theme().light);
const actionText = new DynamicValue(theme(0.5).text, theme(0.5).light);
const backgroundActions = new DynamicValue(theme(0.95).light, theme(0.95).text);
const background = new DynamicValue(theme(0.9).light, theme(0.9).text);

const styles: StylesListOfMusic = {
  container: {
    paddingBottom: 0,
  },
  options: {
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  random: {
    backgroundColor: background,
    width: 180,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 60,
    justifyContent: 'center',
  },
  textRandom: {
    color: colorText,
    marginLeft: 5,
  },
  iconOptions: {
    color: colorText,
    backgroundColor: background,
    borderRadius: 60,
    padding: 2,
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
    color: colorText,
  },

  actionsTitle: {
    color: colorText,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
  },
  actions: {
    backgroundColor: backgroundActions,
    borderRadius: 20,
  },
  actionsText: {
    color: actionText,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
  },
};

const dynamicStyles = new DynamicStyleSheet(styles);

export default dynamicStyles;
