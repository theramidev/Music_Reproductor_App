import React, {FC, useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-view';
import Router from './Router';
import {DarkModeProvider, eventEmitter} from 'react-native-dark-mode';
import AsyncStorage from '@react-native-community/async-storage';

import SplashScreen from 'react-native-splash-screen';

import {Provider, store} from './store';
import {Layout} from './components/Layout';
import {theme} from '../assets/themes';

const App: FC<any> = () => {
  const [mode, setMode] = useState(true);

  // obtiene de la base de datos local si esta en modo oscuro
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

  useEffect(() => {
    getDarkMode();

    SplashScreen.hide();

    eventEmitter.on('currentModeChanged', async newMode => {
      await AsyncStorage.setItem('DarkMode', newMode);

      setMode(newMode === 'dark' ? true : false);
    });
  }, []);

  return (
    <Provider store={store}>
      <DarkModeProvider mode={mode ? 'dark' : 'light'}>
        <SafeAreaProvider>
          <Layout>
            <StatusBar
              barStyle={mode ? 'light-content' : 'dark-content'}
              backgroundColor={mode ? theme(0.9).dark : theme().light}
            />
            <Router />
          </Layout>
        </SafeAreaProvider>
      </DarkModeProvider>
    </Provider>
  );
};

export default App;
