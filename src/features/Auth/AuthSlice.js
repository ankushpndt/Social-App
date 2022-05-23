import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../../utils/API_URL";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const SignUpWithCredentials = createAsyncThunk(
	"/Auth/SignUp",
	async ({ name, email, password }) => {
		try {
			const response = await axios.post(`${API_URL}/user/signup`, {
				name: name,
				email: email,
				password: password,
			});

			return response.data;
		} catch (error) {
			toast.error(error?.response?.data?.message, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
			});
			throw error;
		}
	}
);
export const LoginWithCredentials = createAsyncThunk(
	"/Auth/Login",
	async ({ email, password }) => {
		try {
			const response = await axios.post(`${API_URL}/user/login`, {
				email: email,
				password: password,
			});

			return response.data;
		} catch (error) {
			toast.error(error?.response?.data?.message, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
			});
			throw error;
		}
	}
);

export const AuthSlice = createSlice({
	name: "Auth",
	initialState: {
		login: JSON.parse(localStorage?.getItem("login")) || {
			isUserLoggedIn: false,
			token: "",
			user: "",
			userId: "",
		},
		status: "",
		loader: false,
	},
	reducers: {
		logoutBtnPressed: (state) => {
			toast.success("Logged out successfully");

			localStorage.removeItem("login");
			state.login = { isUserLoggedIn: false, token: "", user: "" };
		},
	},
	extraReducers: {
		[SignUpWithCredentials.pending]: (state) => {
			state.status = "pending";
			state.loader = true;
		},
		[SignUpWithCredentials.fulfilled]: (state, action) => {
			const { token, userName, userid } = action?.payload;
			localStorage.setItem(
				"login",
				JSON.stringify({
					isUserLoggedIn: true,
					token,
					user: userName,
					userId: userid,
				})
			);
			state.login = {
				isUserLoggedIn: true,
				token,
				user: userName,
				userId: userid,
			};
			state.status = "fulfilled";
			state.loader = false;
			toast.success("Signed Up successfully");
		},
		[SignUpWithCredentials.rejected]: (state) => {
			state.status = "rejected";
			state.loader = false;
		},
		[LoginWithCredentials.pending]: (state) => {
			state.status = "pending";
			state.loader = true;
		},
		[LoginWithCredentials.fulfilled]: (state, action) => {
			const { token, userName, userid } = action?.payload;
			localStorage.setItem(
				"login",
				JSON.stringify({
					isUserLoggedIn: true,
					token,
					user: userName,
					userId: userid,
				})
			);
			state.login = {
				isUserLoggedIn: true,
				token,
				user: userName,
				userId: userid,
			};
			state.status = "fulfilled";
			state.loader = false;
			toast.success("Signed in successfully");
		},
		[LoginWithCredentials.rejected]: (state) => {
			state.status = "rejected";
			state.loader = false;
		},
	},
});
export const { logoutBtnPressed } = AuthSlice.actions;
export default AuthSlice.reducer;
