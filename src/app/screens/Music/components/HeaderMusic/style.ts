import {theme} from '../../../../../assets/themes';
import {DynamicValue, DynamicStyleSheet} from 'react-native-dark-mode';

const colorText = new DynamicValue(theme().text, theme().light);
const actionText = new DynamicValue(theme(0.5).text, theme(0.5).light);
const backgroundActions = new DynamicValue(theme(0.95).light, theme(0.95).text);

const styles: any = {
  actionsTitle: {
    color: colorText,
    fontSize: 15,
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  actions: {
    backgroundColor: backgroundActions,
    borderRadius: 10,
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
