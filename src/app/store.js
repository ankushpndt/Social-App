import { configureStore } from '@reduxjs/toolkit';
import PostSliceReducer from '../features/Post/postSlice';
export const store = configureStore({
  reducer: {
    post: PostSliceReducer,
  },
});
