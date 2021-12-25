import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';
export const LoadUsers = createAsyncThunk('Auth/LoadUsers', async () => {
  const response = await axios.get(`${API_URL}/user/getall`);
  console.log(response);
  return response.data;
});
export const User = createAsyncThunk('user/User', async () => {
  const response = await axios.get(`${API_URL}/user`);
  console.log(response);
  // return response.data
});
export const UserDetails = createAsyncThunk(
  'user/UserDetails',
  async ({ username, bio, imgUrl, token }) => {
    try {
      console.log(username, bio, imgUrl);
      const response = await axios.post(
        `${API_URL}/user`,
        {
          name: username,
          bio: bio,
          image: imgUrl,
        },
        { headers: { 'auth-token': token } }
      );
      console.log(response);
      return response.data.user;
    } catch (error) {
      console.log(error.response);
    }
  }
);
export const followUser = createAsyncThunk(
  'user/followUser',
  async ({ _id, token, userToBeFollowed }) => {
    try {
      console.log(_id);
      const response = await axios.put(
        `${API_URL}/user/${userToBeFollowed}/follow`,
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
const UserSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: '',
  },
  reducers: {
    startLoadingUsers: (state) => {
      state.status = 'loading';
    },
  },
  extraReducers: {
    [LoadUsers.pending]: (state) => {
      state.status = 'pending';
    },
    [LoadUsers.fulfilled]: (state, action) => {
      console.log(action);
      state.users = action.payload;
    },
    [LoadUsers.rejected]: (state) => {
      state.status = 'rejected';
    },
    [User.fulfilled]: (state, action) => {
      console.log(action);
      state.users = action.payload;
      state.status = 'fulfilled';
    },
    [UserDetails.fulfilled]: (state, action) => {
      console.log(action);
      state.users.user = state.users.user.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );
      state.status = 'fulfilled';
    },
    [followUser.fulfilled]: (state, action) => {
      const indexOfCurrentUser = state.users.user.findIndex(
        (user) => user._id === action.payload.currentUser._id
      );
      const indexOfFollowedUser = state.users.user.findIndex(
        (user) => user._id === action.payload.userToBeFollowed._id
      );
      console.log({ indexOfCurrentUser, indexOfFollowedUser });

      state.users.user[indexOfCurrentUser] = action.payload.currentUser;
      state.users.user[indexOfFollowedUser] = action.payload.userToBeFollowed;
      // state.users.user = state.users.user
    },
    [unfollowUser.fulfilled]: (state, action) => {
      const indexOfCurrentUser = state.users.user.findIndex(
        (user) => user._id === action.payload.currentUser._id
      );
      const indexOfUnFollowedUser = state.users.user.findIndex(
        (user) => user._id === action.payload.userToBeUnFollowed._id
      );
      console.log({ indexOfCurrentUser, indexOfUnFollowedUser });

      state.users.user[indexOfCurrentUser] = action.payload.currentUser;
      state.users.user[indexOfUnFollowedUser] =
        action.payload.userToBeUnFollowed;
    },
  },
});
export const { startLoadingUsers } = UserSlice.actions;
export default UserSlice.reducer;
