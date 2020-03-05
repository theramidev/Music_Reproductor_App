import React, { FC, useEffect } from 'react';
import { StatusBar, PermissionsAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import Router from './Router';

import SplashScreen from 'react-native-splash-screen';
import TrackPlayer from 'react-native-track-player';

import { Provider, store } from './store';
import { Layout } from './components/Layout';

const App: FC<any> = () => {

  useEffect(() => {
    TrackPlayer.setupPlayer();
    SplashScreen.hide();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS
      ],
      compactCapabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE
      ]
    });
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Layout>
          <StatusBar barStyle="dark-content" />
          <Router />
        </Layout>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
