import {StyleSheet} from 'react-native';
import {theme} from '../../../../../assets/themes';

export default StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: theme().text,
    fontSize: 20,
    fontWeight: 'bold',
    margin: 20,
  },
  inputIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffff',
    borderRadius: 10,
    overflow: 'hidden',
    flex: 1,
  },
  searchIcon: {
    padding: 10,
  },
  search: {
    flex: 1,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
  settings: {
    width: '10%',
    textAlign: 'right',
  },
});
