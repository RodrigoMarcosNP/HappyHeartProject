import { configureStore } from '@reduxjs/toolkit';

import reducers from './ducks';

const store = configureStore({
  reducer: reducers,
});

export default store;
