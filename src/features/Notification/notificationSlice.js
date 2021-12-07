import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';
export const getNotifications = createAsyncThunk(
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
export const addNotifications = createAsyncThunk(
  'notifications/addNotification',
  async ({ postId, target, notificationType }) => {
    try {
      const response = await axios.post(`${API_URL}/notification`, {
        postId,
        target,
        notificationType,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);
export const updateNotifications = createAsyncThunk(
  'notificaitons/updateNotification',
  async ({ notificationId }) => {
    try {
      const response = await axios.put(`${API_URL}/notification`, {
        notificationId,
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
);
export const notificationSlice = createSlice({
  initialState: {
    notifications: [],
    status: '',
  },
  reducers: {},
  extraReducers: {},
});
export default notificationSlice.reducer;
