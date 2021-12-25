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
  },
});
export const { startLoadingUsers } = UserSlice.actions;
export default UserSlice.reducer;
