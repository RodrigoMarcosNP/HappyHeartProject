import { createSlice } from '@reduxjs/toolkit';

export const UserTypes = {
  USER: 'auth/addUser',
  TOKEN: 'auth/setToken',
  AUTHENTICATED: 'auth/setAuthenticated',
};

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    token: '',
    user: {
      name: '',
    },
  },
  reducers: {
    addUser: (state, action) => {
      if (action.type === UserTypes.USER) {
        state.user = action.payload;
      }
    },
    setToken: (state, action) => {
      if (action.type === UserTypes.TOKEN) {
        state.token = action.payload;
      }
    },
    setAuthenticated: (state, action) => {
      if (action.type === UserTypes.AUTHENTICATED) {
        state.authenticated = action.payload;
      }
    },
  },
});

export const { addUser, setToken, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
