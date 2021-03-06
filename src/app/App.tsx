import React, {FC, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-view';
import {DarkModeProvider, eventEmitter} from 'react-native-dark-mode';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer from 'react-native-track-player';
import fs from 'react-native-fs';
import {ActionSheetProvider} from '@expo/react-native-action-sheet';
import Orientation from 'react-native-orientation-locker';
import {I18nextProvider} from 'react-i18next';
import i18n from './i18n';
import * as RNLocalize from 'react-native-localize';

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
  getSongs,
} from './redux/actions/musicActions';
import {setSongToRecent} from './redux/actions/recentsActions';

export const RouteContext = React.createContext({
  path: 'Home',
  updatePath: (route: string) => {},
});

const App: FC<any> = (props: any) => {
  const [mode, setMode] = useState(true);
  const [route, setRoute] = useState({
    path: 'Home',
    updatePath: (route: string) => {
      console.log(route);
      setRoute(use => ({...use, path: route}));
    },
  });
  const [initEvents, cleanEvents] = PlaybackService(
    props.updateCurrentMusicForId,
    props.changeToRandomMode,
    props.changeToLineMode,
    props.setSongToRecent,
  );

  useEffect(() => {
    Orientation.lockToPortrait();

    init();

    return () => {
      // Close the reproductor when close the app
      TrackPlayer.destroy();
      cleanEvents();
      clearShares();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const init = async () => {
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
      // @ts-ignore
      alwaysPauseOnInterruption: true,
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
      notificationCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });

    // Creación de la carpeta temp
    fs.exists(fs.DocumentDirectoryPath + '/temp').then(async exists => {
      // await fs.unlink(fs.DocumentDirectoryPath+'/temp');
      if (!exists) {
        await fs.mkdir(fs.DocumentDirectoryPath + '/temp');
      }
    });

    // Language
    AsyncStorage.getItem('currentLanguage').then(
      async (result: string | null) => {
        if (!result) {
          const [locales] = RNLocalize.getLocales();
          // console.log('[Line 78 App.tsx] ', locales);
          switch (locales.languageCode.toLowerCase()) {
            case 'en':
              {
                i18n.changeLanguage('en');
                await AsyncStorage.setItem('currentLanguage', 'en');
              }
              break;
            case 'es':
              {
                i18n.changeLanguage('es');
                await AsyncStorage.setItem('currentLanguage', 'es');
              }
              break;
            default: {
              i18n.changeLanguage('es');
              await AsyncStorage.setItem('currentLanguage', 'es');
            }
          }
        } else {
          i18n.changeLanguage(result);
        }
      },
    );

    SplashScreen.hide();
  };

  const clearShares = async () => {
    try {
      const shares = await AsyncStorage.getItem('@shares');
      if (shares) {
        const arraySharesPath: string[] = JSON.parse(shares);
        for (const path of arraySharesPath) {
          const fileExist = await fs.exists(path);
          if (fileExist) {
            await fs.unlink(path);
          }
        }

        await AsyncStorage.removeItem('@shares');
      }
    } catch (error) {
      console.error('Clear share: ', error);
    }
  };

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
          <ActionSheetProvider>
            <SafeAreaProvider>
              <RouteContext.Provider value={route}>
                <Layout>
                  <StatusBar
                    barStyle={mode ? 'light-content' : 'dark-content'}
                    translucent={true}
                    backgroundColor={'transparent'}
                  />
                  <Router />
                </Layout>
              </RouteContext.Provider>
            </SafeAreaProvider>
          </ActionSheetProvider>
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
  setSongToRecent,
  getSongs,
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(
  mapStateToProps,
  mapDispatchToProps,
)(App);
