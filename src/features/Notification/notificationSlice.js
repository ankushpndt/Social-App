import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/API_URL";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
export const socketsData = createAction("notifications/socketData");
export const clearSocketData = createAction("notifications/clearSocketData");
export const GetNotifications = createAsyncThunk(
	"notifications/getNotifications",
	async ({ token }) => {
		try {
			const response = await axios.get(`${API_URL}/notification`, {
				headers: { "auth-token": token },
			});
			return response.data;
		} catch (error) {
			toast.dark(error?.response?.data?.message, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	}
);
export const AddNotifications = createAsyncThunk(
	"notifications/addNotification",
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
					headers: { "auth-token": token },
				}
			);

			return response.data.data;
		} catch (error) {
			toast.dark(error?.response?.data?.message, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	}
);
export const UpdateNotifications = createAsyncThunk(
	"notificaitons/updateNotification",
	async ({ notificationId, token }) => {
		try {
			const response = await axios.put(
				`${API_URL}/notification`,
				{
					notificationId,
				},
				{
					headers: { "auth-token": token },
				}
			);

			return response.data.data;
		} catch (error) {
			console.log(error);
		}
	}
);
export const NotificationSlice = createSlice({
	name: "Notification",
	initialState: {
		notifications: [],
		status: "",
	},
	reducers: {},
	extraReducers: {
		[socketsData.pending]: (state) => {
			state.status = "pending";
		},
		[socketsData.fulfilled]: (state, action) => {
			state.notifications = action.payload;
			state.status = "fulfilled";
		},
		[socketsData.rejected]: (state) => {
			state.status = "rejected";
		},
		[clearSocketData.pending]: (state) => {
			state.status = "pending";
		},
		[clearSocketData.fulfilled]: (state, action) => {
			console.log(action);
			state.notifications = state.notifications.filter(
				(noti) => noti._id !== action.payload._id
			);
			state.status = "fulfilled";
		},
		[clearSocketData.rejected]: (state) => {
			state.status = "rejected";
		},
		[GetNotifications.pending]: (state) => {
			state.status = "pending";
		},
		[GetNotifications.fulfilled]: (state, action) => {
			state.notifications = action.payload.data;
			state.status = "fulfilled";
		},
		[GetNotifications.rejected]: (state) => {
			state.status = "rejected";
		},
		[AddNotifications.pending]: (state) => {
			state.status = "pending";
		},
		[AddNotifications.fulfilled]: (state, action) => {
			console.log(action);
			const newNotification = action.payload;

			state.notifications = state.notifications.concat(newNotification);
			state.status = "fulfilled";
		},
		[AddNotifications.rejected]: (state) => {
			state.status = "rejected";
		},
		[UpdateNotifications.pending]: (state) => {
			state.status = "pending";
		},
		[UpdateNotifications.fulfilled]: (state, action) => {
			const currentNotification = state.notifications.findIndex(
				(noti) => noti._id === action.payload._id
			);

			state.notifications[currentNotification] = action.payload;
			state.status = "fulfilled";
		},
		[UpdateNotifications.rejected]: (state) => {
			state.status = "rejected";
		},
	},
});
export default NotificationSlice.reducer;
