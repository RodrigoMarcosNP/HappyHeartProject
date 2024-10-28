import { configureStore } from '@reduxjs/toolkit';

import reducers from './ducks';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: reducers,
});

export type RootState = ReturnType<typeof store.getState>

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store;
