import React, { FC } from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-view';
import Router from './Router';

import { Provider, store } from './store';
import { Layout } from './components/Layout';

const App: FC<any> = () => {
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
