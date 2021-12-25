import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';
export const GetNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async () => {
    try {
      const response = await axios.get(`${API_URL}/notification`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);
export const AddNotifications = createAsyncThunk(
  'notifications/addNotification',
  async ({ postId, target, notificationType, token }) => {
    console.log({ notificationType });
    try {
      const response = await axios.post(
        `${API_URL}/notification`,
        {
          postId,
          target,
          notificationType,
        },
        {
          headers: { 'auth-token': token },
        }
      );
      console.log(response);
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const UpdateNotifications = createAsyncThunk(
  'notificaitons/updateNotification',
  async ({ notificationId, token }) => {
    try {
      const response = await axios.put(
        `${API_URL}/notification`,
        {
          notificationId,
        },
        {
          headers: { 'auth-token': token },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);
export const NotificationSlice = createSlice({
  name: 'Notification',
  initialState: {
    notifications: [],
    status: '',
  },
  reducers: {},
  extraReducers: {
    [GetNotifications.fulfilled]: (state, action) => {
      console.log(action);
      state.notifications = action.payload;
      state.status = 'fulfilled';
    },
    [AddNotifications.fulfilled]: (state, action) => {
      console.log(action);
      state.notifications = action.payload;
      state.status = 'fulfilled';
    },
    [UpdateNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload;
      state.status = 'fulfilled';
    },
  },
});
export default NotificationSlice.reducer;
