import React, {FC, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-view';
import {DarkModeProvider, eventEmitter} from 'react-native-dark-mode';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen';
import TrackPlayer from 'react-native-track-player';

import Router from './Router';
import {Provider, store} from './store';
import {Layout} from './components/Layout';
import database from './database';
import {PlaybackService} from './service';
import {connect} from 'react-redux';
import {updateCurrentMusicForId} from './redux/actions/musicActions';

const App: FC<any> = (props: any) => {
  const [mode, setMode] = useState(true);
  const [initEvents, cleanEvents] = PlaybackService(
    props.updateCurrentMusicForId,
  );

  useEffect(() => {
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
};

// eslint-disable-next-line prettier/prettier
export default connect<any, any>(mapStateToProps, mapDispatchToProps)(App);
