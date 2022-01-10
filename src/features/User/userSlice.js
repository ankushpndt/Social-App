import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';
export const LoadUsers = createAsyncThunk('Auth/LoadUsers', async () => {
  const response = await axios.get(`${API_URL}/user/getall`);

  return response.data;
});
// export const User = createAsyncThunk('user/User', async () => {
//   const response = await axios.get(`${API_URL}/user`);
//   console.log(response);
//   // return response.data
// });
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
      const response = await axios.put(
        `${API_URL}/user/${userToBeFollowed}/follow`,
        {
          userId: _id,
        },
        {
          headers: { 'auth-token': token },
        }
      );

      return response.data;
    } catch (error) {
      console.log(error.response);
    }
  }
);
export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',

  async ({ _id, token, following }) => {
    try {
      const response = await axios.put(
        `${API_URL}/user/${following}/unfollow`,
        {
          userId: _id,
        },
        {
          headers: { 'auth-token': token },
        }
      );

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
      state.users = action.payload;
      state.status = 'fulfilled';
    },
    [LoadUsers.rejected]: (state) => {
      state.status = 'rejected';
    },
    // [User.fulfilled]: (state, action) => {
    //   state.users = action.payload;
    //   state.status = 'fulfilled';
    // },
    [UserDetails.pending]: (state) => {
      state.status = 'pending';
    },
    [UserDetails.fulfilled]: (state, action) => {
      state.users.user = state.users.user.map((el) =>
        el._id === action.payload._id ? action.payload : el
      );
      state.status = 'fulfilled';
    },
    [UserDetails.rejected]: (state) => {
      state.status = 'rejected';
    },
    [followUser.pending]: (state) => {
      state.status = 'pending';
    },
    [followUser.fulfilled]: (state, action) => {
      const indexOfCurrentUser = state.users.user.findIndex(
        (user) => user._id === action.payload.currentUser._id
      );
      const indexOfFollowedUser = state.users.user.findIndex(
        (user) => user._id === action.payload.userToBeFollowed._id
      );

      state.users.user[indexOfCurrentUser] = action.payload.currentUser;
      state.users.user[indexOfFollowedUser] = action.payload.userToBeFollowed;
      state.status = 'fulfilled';
    },
    [followUser.rejected]: (state) => {
      state.status = 'rejected';
    },
    [unfollowUser.pending]: (state) => {
      state.status = 'pending';
    },
    [unfollowUser.fulfilled]: (state, action) => {
      const indexOfCurrentUser = state.users.user.findIndex(
        (user) => user._id === action.payload.currentUser._id
      );
      const indexOfUnFollowedUser = state.users.user.findIndex(
        (user) => user._id === action.payload.userToBeUnFollowed._id
      );

      state.users.user[indexOfCurrentUser] = action.payload.currentUser;
      state.users.user[indexOfUnFollowedUser] =
        action.payload.userToBeUnFollowed;
      state.status = 'fulfilled';
    },
    [unfollowUser.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});
export const { startLoadingUsers } = UserSlice.actions;
export default UserSlice.reducer;
