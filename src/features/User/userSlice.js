import { createSlice } from '@reduxjs/toolkit';
export const Users = createAsyncThunk('Auth/Users', async () => {
  const response = await axios.get(`${API_URL}/user/getall`);
  console.log(response);
});
const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
  },
  reducers: {},
  extraReducers: {
    [Users.pending]: (state) => {
      state.status = 'pending';
    },
    [Users.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [Users.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});
