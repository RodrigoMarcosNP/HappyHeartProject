import { createSlice } from '@reduxjs/toolkit';

export const UserTypes = {
  USER: 'auth/postUser',
  TOKEN: 'auth/setToken',
  AUTHENTICATED: 'auth/setAuthenticated',
};

export interface User {
  email: string,
  password: string,
  type: string
}

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    token: '',
    user: {
      email: '',
      password: '',
      type: ''
    },
  },
  reducers: {
    postUser: (state, action) => {
      if (action.type === UserTypes.USER) {
        state.user = {
          ...state.user,
          email: action.payload.email,
          password: action.payload.password,
          type: action.payload.type
        };
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

export const { postUser, setToken, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
