import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/API_URL";
import "react-toastify/dist/ReactToastify.css";

export const userPosts = createAsyncThunk(
	"User/userPosts",
	async ({ userId }) => {
		try {
			const response = await axios.get(`${API_URL}/post/${userId}`);
			return response.data.userPosts;
		} catch (err) {
			toast.dark(err?.response?.data?.message, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	}
);

export const UserPostSlice = createSlice({
	name: "User",
	initialState: {
		userPost: [],
		loader: false,
		status: "",
	},
	reducers: {},
	extraReducers: {
		[userPosts.pending]: (state) => {
			state.status = "pending";
			state.loader = true;
		},
		[userPosts.fulfilled]: (state, action) => {
			state.userPost = action.payload;
			state.status = "fulfilled";
			state.loader = false;
		},
	},
});

export default UserPostSlice.reducer;
