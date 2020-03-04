import React, { FC, useEffect } from 'react';
import { StatusBar, PermissionsAndroid } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import Router from './Router';

import SplashScreen from 'react-native-splash-screen';

import { Provider, store } from './store';
import { Layout } from './components/Layout';

const App: FC<any> = () => {

  useEffect(() => {
    SplashScreen.hide();
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
