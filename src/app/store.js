import { configureStore } from "@reduxjs/toolkit";
import PostSliceReducer from "../features/Post/postSlice";
import AuthSliceReducer from "../features/Auth/AuthSlice";
import UserSliceReducer from "../features/User/userSlice";
import NotificationSliceReducer from "../features/Notification/notificationSlice";
import BookmarkSliceReducer from "../features/Bookmark/BookmarkSlice";
export const store = configureStore({
	reducer: {
		post: PostSliceReducer,
		auth: AuthSliceReducer,
		user: UserSliceReducer,
		notification: NotificationSliceReducer,
		bookmark: BookmarkSliceReducer,
	},
});
