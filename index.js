/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/app/App';
import TrackPlayer from 'react-native-track-player';
import service from './service';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => service);
