import * as React from 'react';
import { Provider } from 'react-redux';

import Routes from '@/src/routes';
import store from '@/src/store';

export default function App() {
  return (
    <Provider store={store} children={undefined}>
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    </Provider>
  )
}