import {AppRegistry} from 'react-native';
import index from './src/index';
import {name as appName} from './app.json';
import './src/app/i18n';

AppRegistry.registerComponent(appName, () => index);
