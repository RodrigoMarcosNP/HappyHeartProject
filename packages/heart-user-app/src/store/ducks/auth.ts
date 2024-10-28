import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Config from '@/data/config';
import { AuthHandler } from '@/src/handlers/AuthHandler';

export const UserTypes = {
  TOKEN: 'auth/setToken',
  AUTHENTICATED: 'auth/setAuthenticated',
};

export interface User {
  email: string;
  password: string;
  type?: string;
}

export const postUser = createAsyncThunk(
  'auth/postUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(Config.ENDPOINTS.LOGIN, {
        email: userData.email,
        password: userData.password,
      });
      console.log(response)
      return { type: response.data.typeUser, token: response.data.token };
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (userData: User, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${Config.ENDPOINTS.LOGIN}/${userData.email}`);
      return { name: response.data.user, password: response.data.password };
    } catch(error: any) {
      return rejectWithValue(error.response.data)
    }
  }
)

const authHandler = new AuthHandler();

const userSlice = createSlice({
  name: 'auth',
  initialState: {
    authenticated: false,
    token: '',
    user: {
      email: '',
      password: '',
      type: '',
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postUser.fulfilled, (state, action) => {
        state.authenticated = true; 
        state.user.type = action.payload.type;
        state.token = action.payload.token;
      })
      .addCase(postUser.rejected, (state, action) => {
        console.error('Failed to authenticate user:', action.payload);
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user.email = action.payload.
        authHandler.validatePassword(action.payload.password)
        state.user.password;
      })
  },
});

export const { setToken, setAuthenticated } = userSlice.actions;

export default userSlice.reducer;
