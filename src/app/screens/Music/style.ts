import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contentImage: {
    width: '100%',
    height: '63%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  image: {
    height: 270,
    width: 270,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  author: {
    color: 'gray',
    fontSize: 20,
  },
  album: {
    color: 'gray',
    fontSize: 10,
  },
});
