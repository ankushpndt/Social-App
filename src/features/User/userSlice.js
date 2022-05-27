import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/API_URL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const LoadUsers = createAsyncThunk("Auth/LoadUsers", async () => {
	try {
		const response = await axios.get(`${API_URL}/user/getall`);
		return response.data;
	} catch (error) {
		toast.error(error?.response?.data?.message);
	}
});

export const UserDetails = createAsyncThunk(
	"user/UserDetails",
	async ({ username, bio, imgUrl, token }) => {
		try {
			const response = await axios.post(
				`${API_URL}/user`,
				{
					name: username,
					bio: bio,
					image: imgUrl,
				},
				{ headers: { "auth-token": token } }
			);

			return response.data.user;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const followUser = createAsyncThunk(
	"user/followUser",
	async ({ _id, token, userToBeFollowed }) => {
		try {
			const response = await axios.put(
				`${API_URL}/user/${userToBeFollowed}/follow`,
				{
					userId: _id,
				},
				{
					headers: { "auth-token": token },
				}
			);

			return response.data;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const unfollowUser = createAsyncThunk(
	"user/unfollowUser",

	async ({ _id, token, following }) => {
		try {
			const response = await axios.put(
				`${API_URL}/user/${following}/unfollow`,
				{
					userId: _id,
				},
				{
					headers: { "auth-token": token },
				}
			);

			return response.data;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
const UserSlice = createSlice({
	name: "users",
	initialState: {
		users: [],
		status: "",
	},
	reducers: {
		startLoadingUsers: (state) => {
			state.status = "loading";
		},
	},
	extraReducers: {
		[LoadUsers.pending]: (state) => {
			state.status = "pending";
		},
		[LoadUsers.fulfilled]: (state, action) => {
			state.users = action.payload;
			state.status = "fulfilled";
		},
		[LoadUsers.rejected]: (state) => {
			state.status = "rejected";
		},
		[UserDetails.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[UserDetails.fulfilled]: (state, action) => {
			state.users.user = state.users.user.map((el) =>
				el._id === action.payload?._id ? action.payload : el
			);
			state.status = "fulfilled";
			toast.dismiss();
			toast.success("Profile updated successfully");
		},
		[UserDetails.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss();
		},
		[followUser.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[followUser.fulfilled]: (state, action) => {
			const indexOfCurrentUser = state.users.user.findIndex(
				(user) => user._id === action.payload.currentUser?._id
			);
			const indexOfFollowedUser = state.users.user.findIndex(
				(user) => user._id === action.payload.userToBeFollowed._id
			);

			state.users.user[indexOfCurrentUser] = action.payload.currentUser;
			state.users.user[indexOfFollowedUser] = action.payload.userToBeFollowed;
			state.status = "fulfilled";
			toast.dismiss();
			toast.success("User has been followed");
		},
		[followUser.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss("Please wait");
		},
		[unfollowUser.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[unfollowUser.fulfilled]: (state, action) => {
			const indexOfCurrentUser = state.users.user.findIndex(
				(user) => user._id === action.payload?.currentUser?._id
			);
			const indexOfUnFollowedUser = state.users.user.findIndex(
				(user) => user._id === action.payload?.userToBeUnFollowed._id
			);

			state.users.user[indexOfCurrentUser] = action.payload?.currentUser;
			state.users.user[indexOfUnFollowedUser] =
				action.payload?.userToBeUnFollowed;
			state.status = "fulfilled";
			toast.dismiss();
			toast.success("User has been unfollowed");
		},
		[unfollowUser.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss();
		},
	},
});
export const { startLoadingUsers } = UserSlice.actions;
export default UserSlice.reducer;
