// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { API_URL } from '../../utils/API_URL';

// export const SignUp = createAsyncThunk('/Auth/SignUp', async () => {
//   const response = await axios.post(`${API_URL}/user/signup`, {});
//   console.log(response);
// });
// export const Login = createAsyncThunk('/Auth/Login', async () => {
//   const response = await axios.post(`${API_URL}/user/login`, {});
//   console.log(response);
// });
// export const AuthSlice = createSlice({
//   name: 'Auth',
//   initialState: { users: [], status: '' },
//   reducers: {},
//   extraReducers: {
//     [SignUp.pending]: (state) => {
//       state.status = 'pending';
//     },
//     [SignUp.fulfilled]: (state, action) => {
//       console.log(action);
//       state.users = action.payload;
//       state.status = 'fulfilled';
//     },
//     [SignUp.rejected]: (state) => {
//       state.status = 'rejected';
//     },
//     [Login.pending]: (state) => {
//       state.status = 'pending';
//     },
//     [Login.fulfilled]: (state, action) => {
//       console.log(action);
//       state.users = action.payload;
//       state.status = 'fulfilled';
//     },
//     [Login.rejected]: (state) => {
//       state.status = 'rejected';
//     },
//   },
// });
