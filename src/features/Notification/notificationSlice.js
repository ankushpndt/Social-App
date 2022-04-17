import { createSlice } from "@reduxjs/toolkit";
import "react-toastify/dist/ReactToastify.css";

export const NotificationSlice = createSlice({
	name: "Notification",
	initialState: {
		notifications: [],
	},
	reducers: {
		getNotification: (state, action) => {
			state.notifications = action.payload;
		},
		clearNotification: (state, action) => {
			state.notifications = state.notifications.filter(
				(noti) => noti._id !== action.payload._id
			);
		},
	},
});
export const { getNotification, clearNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
