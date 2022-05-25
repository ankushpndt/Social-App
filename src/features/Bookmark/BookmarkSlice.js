import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/API_URL";
import "react-toastify/dist/ReactToastify.css";
export const getBookmarks = createAsyncThunk(
	"bookmark/getBookmarks",
	async ({ userId }) => {
		try {
			const response = await axios.get(`${API_URL}/bookmark/${userId}`);
			return response.data.allBookmarks;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const addBookmark = createAsyncThunk(
	"bookmark/addBookmark",
	async ({ userId, postId }) => {
		try {
			const response = await axios.post(`${API_URL}/bookmark`, {
				userId,
				postId,
			});

			return response.data.newBookmark;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const deleteBookmark = createAsyncThunk(
	"bookmark/deleteBookmark",
	async ({ bookmarkId }) => {
		try {
			const response = await axios.put(`${API_URL}/bookmark`, {
				_id: bookmarkId,
			});

			return response.data.deletedBookmark;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const BookmarkSlice = createSlice({
	name: "bookmark",
	initialState: {
		bookmarks: [],
		status: "",
	},
	reducers: {},
	extraReducers: {
		[getBookmarks.pending]: (state) => {
			state.status = "pending";
		},
		[getBookmarks.fulfilled]: (state, action) => {
			state.bookmarks = action.payload;
			state.status = "fulfilled";
		},
		[getBookmarks.rejected]: (state) => {
			state.status = "rejected";
		},
		[addBookmark.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[addBookmark.fulfilled]: (state, action) => {
			state.bookmarks = state.bookmarks.concat(action.payload);
			state.status = "fulfilled";
			toast.dismiss();
			toast.success("Post added to bookmark");
		},
		[addBookmark.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss();
		},
		[deleteBookmark.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[deleteBookmark.fulfilled]: (state, action) => {
			state.bookmarks = state?.bookmarks?.filter(
				(item) => item?.postId !== action.payload?.postId
			);
			state.status = "fulfilled";
			toast.dismiss();
			toast.success("Post deleted from bookmark");
		},
		[deleteBookmark.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss();
		},
	},
});
export default BookmarkSlice.reducer;
