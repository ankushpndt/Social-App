import { createAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';
export const socketsData = createAction('notifications/socketData');
export const clearSocketData = createAction('notifications/clearSocketData');
export const GetNotifications = createAsyncThunk(
  'notifications/getNotifications',
  async ({ token }) => {
    try {
      const response = await axios.get(`${API_URL}/notification`, {
        headers: { 'auth-token': token },
      });

      console.log(response);
      return response.data;
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
      return response.data.data;
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
    [socketsData]: (state, action) => {
      state.notifications = action.payload;
      state.status = 'fulfilled';
    },
    [clearSocketData]: (state, action) => {
      console.log(action);
      state.notifications = state.notifications.filter(
        (noti) => noti._id !== action.payload._id
      );
      state.status = 'fulfilled';
    },
    [GetNotifications.fulfilled]: (state, action) => {
      state.notifications = action.payload.data;
      state.status = 'fulfilled';
    },
    [AddNotifications.fulfilled]: (state, action) => {
      console.log(action);
      const newNotification = action.payload;

      state.notifications = state.notifications.concat(newNotification);
      state.status = 'fulfilled';
    },
    [UpdateNotifications.fulfilled]: (state, action) => {
      const currentNotification = state.notifications.findIndex(
        (noti) => noti._id === action.payload._id
      );

      state.notifications[currentNotification] = action.payload;
      state.status = 'fulfilled';
    },
  },
});
export default NotificationSlice.reducer;
