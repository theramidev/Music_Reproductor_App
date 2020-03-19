import React, {FC, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-view';
import {DarkModeProvider, eventEmitter} from 'react-native-dark-mode';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer from 'react-native-track-player';
import fs from 'react-native-fs';
import Orientation from 'react-native-orientation-locker';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

import Router from './Router';
import {Provider, store} from './store';
import {Layout} from './components/Layout';
import database from './database';
import {PlaybackService} from './service';
import {connect} from 'react-redux';
import {
  updateCurrentMusicForId,
  changeToLineMode,
  changeToRandomMode,
} from './redux/actions/musicActions';

const App: FC<any> = (props: any) => {
  const [mode, setMode] = useState(true);
  const [initEvents, cleanEvents] = PlaybackService(
    props.updateCurrentMusicForId,
    props.changeToRandomMode,
    props.changeToLineMode,
  );

  useEffect(() => {
    Orientation.lockToPortrait();

    // Open Database
    database.open();

    initEvents();

    getDarkMode();

    // evento que se ejecuta cuando se cambia el tema de la aplicacion
    eventEmitter.on('currentModeChanged', async newMode => {
      await AsyncStorage.setItem('DarkMode', newMode);

      setMode(newMode === 'dark' ? true : false);
    });

    // Intance Player
    TrackPlayer.setupPlayer();
    // Player options
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
      ],
    });

    // Creación de la carpeta temp
    fs.exists(fs.DocumentDirectoryPath+'/temp').then(async (exists) => {
        // await fs.unlink(fs.DocumentDirectoryPath+'/temp');
        if (!exists) {
          await fs.mkdir(fs.DocumentDirectoryPath+'/temp');
        }
    });;

    SplashScreen.hide();

    return () => {
      // Close the reproductor when close the app
      TrackPlayer.destroy();
      cleanEvents();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // obtiene del AsyncStorage si está en modo oscuro
  const getDarkMode = async () => {
    try {
      var darkMode: boolean = true;
      const data = await AsyncStorage.getItem('DarkMode');
      if (!data) {
        await AsyncStorage.setItem('DarkMode', 'dark');
      } else {
        darkMode = data === 'dark' ? true : false;
      }

      setMode(darkMode);
    } catch (err) {
      console.log('a error ucurred');
    }
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <DarkModeProvider mode={mode ? 'dark' : 'light'}>
          <SafeAreaProvider>
            <Layout>
              <StatusBar
                barStyle={mode ? 'light-content' : 'dark-content'}
                translucent={true}
                backgroundColor={'transparent'}
              />
              <Router />
            </Layout>
          </SafeAreaProvider>
        </DarkModeProvider>
      </I18nextProvider>
    </Provider>
  );
};

const mapStateToProps = ({musicReducer}: any) => {
  return {
    musicReducer,
  };
};

const mapDispatchToProps = {
  updateCurrentMusicForId,
  changeToLineMode,
  changeToRandomMode,
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(mapStateToProps, mapDispatchToProps)(App);
