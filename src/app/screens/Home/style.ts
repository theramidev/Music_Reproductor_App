import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  scroll: {
    height: '100%',
    flex: 1,
    backgroundColor: 'gray',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
    position: 'absolute',
    resizeMode: 'cover',
  },

  loading: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
  },
  center: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  introText: {
    fontSize: 50,
    color: 'white',
    fontWeight: 'bold',
  },
  splashImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
  },
});
