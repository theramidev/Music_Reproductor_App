import {StyleSheet} from 'react-native';
import {theme} from '../../../assets/themes';

export default StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: theme().text,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
});
