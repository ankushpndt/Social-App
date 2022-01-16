import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';

import { toast } from 'react-toastify';

export const SignUpWithCredentials = createAsyncThunk(
  '/Auth/SignUp',
  async ({ name, email, password }) => {
    try {
      toast('Signing Up!', {
        position: 'top-right',
        autoClose: 2000,
      });
      const response = await axios.post(`${API_URL}/user/signup`, {
        name: name,
        email: email,
        password: password,
      });
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const LoginWithCredentials = createAsyncThunk(
  '/Auth/Login',
  async ({ email, password }) => {
    try {
      toast('Logging In!', {
        position: 'top-right',
        autoClose: 2000,
      });
      const response = await axios.post(`${API_URL}/user/login`, {
        email: email,
        password: password,
      });
      console.log(response);

      return response.data;
    } catch (error) {
      console.log(error.response.data);
      return error.response.data;
    }
  }
);

export const AuthSlice = createSlice({
  name: 'Auth',
  initialState: {
    login: JSON.parse(localStorage?.getItem('login')) || {
      isUserLoggedIn: false,
      token: '',
      user: '',
      userId: '',
    },
    status: '',
  },
  reducers: {
    logoutBtnPressed: (state, action) => {
      toast('Logging out !', {
        position: 'top-right',
        autoClose: 2000,
      });

      localStorage.removeItem('login');
      state.login = { isUserLoggedIn: false, token: '', user: '' };
    },
  },
  extraReducers: {
    [SignUpWithCredentials.pending]: (state) => {
      state.status = 'pending';
    },
    [SignUpWithCredentials.fulfilled]: (state, action) => {
      const { token, userName, userid } = action?.payload;
      localStorage.setItem(
        'login',
        JSON.stringify({
          isUserLoggedIn: true,
          token,
          user: userName,
          userId: userid,
        })
      );
      state.login = {
        isUserLoggedIn: true,
        token,
        user: userName,
        userId: userid,
      };
      state.status = 'fulfilled';
    },
    [SignUpWithCredentials.rejected]: (state) => {
      state.status = 'rejected';
    },
    [LoginWithCredentials.pending]: (state) => {
      state.status = 'pending';
    },
    [LoginWithCredentials.fulfilled]: (state, action) => {
      const { token, userName, userid } = action?.payload;
      localStorage.setItem(
        'login',
        JSON.stringify({
          isUserLoggedIn: true,
          token,
          user: userName,
          userId: userid,
        })
      );
      state.login = {
        isUserLoggedIn: true,
        token,
        user: userName,
        userId: userid,
      };
      state.status = 'fulfilled';
    },
    [LoginWithCredentials.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});
export const { logoutBtnPressed } = AuthSlice.actions;
export default AuthSlice.reducer;
