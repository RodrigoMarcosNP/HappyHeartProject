import '@expo/metro-runtime';

import { Assets } from '@react-navigation/elements';
import { registerRootComponent } from 'expo';
import { Asset } from 'expo-asset';
import * as React from 'react';
import { Provider } from 'react-redux';

import Routes from './src/routes';
import store from './src/store';

Asset.loadAsync(Assets);

registerRootComponent(() => (
  <Provider store={store}>
    <React.StrictMode>
      <Routes />
    </React.StrictMode>
  </Provider>
));
