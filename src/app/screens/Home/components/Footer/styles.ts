import {StyleSheet} from 'react-native';
import {theme} from '../../../../../assets/themes';

export default StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderColor: '#808B96',
    borderWidth: 1,
    backgroundColor: '#FDFEFE',
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
    color: theme().text,
    fontSize: 17,
  },
  group: {
    color: theme().text,
    fontSize: 10,
  },

  options: {
    flexDirection: 'row',
  },
  icon: {
    marginRight: 10,
  },
});
