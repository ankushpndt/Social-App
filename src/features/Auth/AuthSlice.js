import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';

import { toast } from 'react-toastify';

export const SignUpWithCredentials = createAsyncThunk(
  '/Auth/SignUp',
  async ({ name, email, password }) => {
    console.log({ name, email, password });
    const response = await axios.post(`${API_URL}/user/signup`, {
      name: name,
      email: email,
      password: password,
    });
    console.log(response);
    return response.data.saveUser;
  }
);
export const LoginWithCredentials = createAsyncThunk(
  '/Auth/Login',
  async (email, password) => {
    const response = await axios.post(`${API_URL}/user/login`, {
      email: email,
      password: password,
    });
    console.log(response);

    return response.data;
  }
);
export const followUser = createAsyncThunk(
  'user/followUser',
  async ({ _id, token, follower }) => {
    try {
      console.log(_id);
      const response = await axios.put(
        `${API_URL}/user/${follower}/follow`,
        {
          userId: _id,
        },
        {
          headers: { 'auth-token': token },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',

  async ({ _id, token, following }) => {
    try {
      console.log(_id);
      console.log(following);
      const response = await axios.put(
        `${API_URL}/user/${following}/unfollow`,
        {
          userId: _id,
        },
        {
          headers: { 'auth-token': token },
        }
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.response);
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
      // toast('Logging out !', {
      //   position: 'top-right',
      //   autoClose: 2000,
      // });
      console.log(action);
      console.log(state);
      console.log('called');
      localStorage.removeItem('login');
      state.login = { isUserLoggedIn: false, token: '', user: '' };
      // return { isUserLoggedIn: false, token: '', user: '' };
    },
    // removeSignup: (state) => {
    //   state.signup = false;
    // },
  },
  extraReducers: {
    [SignUpWithCredentials.pending]: (state) => {
      state.status = 'pending';
    },
    [SignUpWithCredentials.fulfilled]: (state, action) => {
      console.log(action);
      // state.users = action.payload;
      state.status = 'fulfilled';
    },
    [SignUpWithCredentials.rejected]: (state) => {
      state.status = 'rejected';
    },
    [LoginWithCredentials.pending]: (state) => {
      state.status = 'pending';
    },
    [LoginWithCredentials.fulfilled]: (state, action) => {
      console.log(action);
      const { token, userName, userid } = action.payload;
      console.log(userid);
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
      // navigate("/")
      state.status = 'fulfilled';
    },
    [LoginWithCredentials.rejected]: (state) => {
      state.status = 'rejected';
    },
    [followUser.fulfilled]: (state, action) => {
      console.log(action);

      state.users.user = state.users?.user
        .find((user) => user?._id === state.auth.login.userId)
        .following.push(action.payload?.followedUser);
      state.status = 'fulfilled';
    },
    [unfollowUser.fulfilled]: (state, action) => {
      console.log(action);
      state.users.user = state.users.user
        .find((user) => user._id === state.auth.login.userId)
        .following.splice(action.payload.unfollowedUser, 1);
      state.status = 'fulfilled';
    },
  },
});
export const { logoutBtnPressed } = AuthSlice.actions;
export default AuthSlice.reducer;
