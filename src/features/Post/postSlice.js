import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { API_URL } from '../../utils/API_URL';
// const user = useSelector((state) => state.login);
// console.log(user);
export const LoadPosts = createAsyncThunk(
  'post/LoadPosts',
  async ({ userId }) => {
    // const { userId } = user;
    // console.log(userId);
    try {
      const response = await axios.get(`${API_URL}/post/getall/${userId}`);
      console.log(response);
      return response.data.bothPosts;
    } catch (error) {
      console.log(error.message);
    }
  }
);

export const PostBtn = createAsyncThunk(
  'posts/PostBtn',
  async ({ postData, imgUrl, userId }) => {
    console.log(userId);
    try {
      const response = await axios.post(`${API_URL}/post`, {
        description: postData,
        media: imgUrl ? imgUrl : '',
        _id: userId,
      });
      console.log(response);
      return response.data.newPost;
    } catch (error) {
      console.log(error);
    }
  }
);
export const RemoveBtn = createAsyncThunk(
  'posts/RemoveBtn',
  async ({ userId, postId }, { getState }) => {
    console.log({ userId, postId });

    try {
      const response = await axios.put(`${API_URL}/post`, {
        userId,
        postId,
      });
      console.log(response);
      const res = getState();
      console.log(res);
      return response.data.deletedPost;
    } catch (err) {
      console.log(err.response);
    }
  }
);
export const LikeBtn = createAsyncThunk(
  'posts/LikeBtn',
  async ({ postId, userId }) => {
    try {
      const response = await axios.post(`${API_URL}/post/${postId}/like`, {
        _id: userId,
      });

      return response.data.post;
    } catch (err) {
      console.log(err);
    }
  }
);
export const CommentBtn = createAsyncThunk(
  'posts/CommentBtn',
  async ({ postId, comment }) => {
    try {
      const response = await axios.post(`${API_URL}/post/${postId}/comment`, {
        comment,
      });

      return response.data.comments;
    } catch (err) {
      console.log(err);
    }
  }
);
export const RemoveComment = createAsyncThunk(
  'posts/RemoveComment',
  async ({ postId, commentId }) => {
    try {
      const response = await axios.put(`${API_URL}/post/${postId}/comment`, {
        postId,
        commentId,
      });
      console.log(response);
      return response.data.post;
    } catch (err) {
      console.log(err);
    }
  }
);
export const PostSlice = createSlice({
  name: 'Post',
  initialState: {
    posts: [],
    userPosts: [],
    status: '',
  },
  reducers: {
    startLoadingPosts: (state) => {
      state.status = 'loading';
    },
  },
  extraReducers: {
    [LoadPosts.pending]: (state) => {
      state.status = 'pending';
    },
    [LoadPosts.fulfilled]: (state, action) => {
      console.log(action);
      state.posts = action.payload;
      state.status = 'fulfilled';
    },
    [LoadPosts.rejected]: (state, action) => {
      state.status = 'rejected';
    },
    [PostBtn.pending]: (state) => {
      state.status = 'pending';
    },
    [PostBtn.fulfilled]: (state, action) => {
      state.posts.unshift(action.payload);
    },
    [PostBtn.rejected]: (state) => {
      state.status = 'rejected';
    },
    [RemoveBtn.pending]: (state) => {
      state.status = 'pending';
    },
    [RemoveBtn.fulfilled]: (state, action) => {
      console.log(action);
      state.posts = state.posts.filter((post) => {
        return post?._id !== action.payload?._id;
      });
      state.status = 'fulfilled';
    },
    [RemoveBtn.rejected]: (state) => {
      state.status = 'rejected';
    },
    [LikeBtn.pending]: (state) => {
      state.status = 'pending';
    },
    [LikeBtn.rejected]: (state) => {
      state.status = 'rejected';
    },
    [LikeBtn.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });

      state.status = 'fulfilled';
    },
    [CommentBtn.pending]: (state) => {
      state.status = 'pending';
    },
    [CommentBtn.fulfilled]: (state, action) => {
      state.status = 'fulfilled';

      state.posts = state.posts.map((post) => {
        return post._id === action.payload._id
          ? { ...post, comments: action.payload.comment }
          : post;
      });
    },
    [CommentBtn.rejected]: (state) => {
      state.status = 'rejected';
    },
    [RemoveComment.pending]: (state) => {
      state.status = 'pending';
    },
    [RemoveComment.fulfilled]: (state, action) => {
      console.log(action.payload);

      let post = state.posts.find((post) => {
        console.log(post._id === action.payload._id);
        return post._id === action.payload._id;
      });
      if (post) post.comments = action.payload.comments;

      state.status = 'fulfilled';
    },
    [RemoveComment.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});
export const { startLoadingPosts } = PostSlice.actions;
export default PostSlice.reducer;
