import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../utils/API_URL";
import "react-toastify/dist/ReactToastify.css";
export const LoadPosts = createAsyncThunk(
	"post/LoadPosts",
	async ({ userId }) => {
		try {
			const response = await axios.get(`${API_URL}/post/getall/${userId}`);

			return response.data.bothPosts;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);

export const PostBtn = createAsyncThunk(
	"posts/PostBtn",
	async ({ postData, imgUrl, userId, setStatus }) => {
		try {
			const response = await axios.post(`${API_URL}/post`, {
				description: postData,
				media: imgUrl ? imgUrl : "",
				_id: userId,
			});
			setStatus(false);
			toast.success(response.data.message);
			return response.data.newPost;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const RemoveBtn = createAsyncThunk(
	"posts/RemoveBtn",
	async ({ userId, postId }) => {
		try {
			const response = await axios.put(`${API_URL}/post`, {
				userId,
				postId,
			});
			toast.success(response.data.message);
			return response.data.deletedPost;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const LikeBtn = createAsyncThunk(
	"posts/LikeBtn",
	async ({ postId, userId }) => {
		try {
			const response = await axios.post(`${API_URL}/post/${postId}/like`, {
				_id: userId,
			});
			return response.data.post;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const CommentBtn = createAsyncThunk(
	"posts/CommentBtn",
	async ({ postId, comment, userId }) => {
		try {
			const response = await axios.post(`${API_URL}/post/${postId}/comment`, {
				_id: userId,
				comment,
			});

			return response.data.comments;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const RemoveComment = createAsyncThunk(
	"posts/RemoveComment",
	async ({ postId, commentId }) => {
		try {
			const response = await axios.put(`${API_URL}/post/${postId}/comment`, {
				postId,
				commentId,
			});

			return response.data.post;
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	}
);
export const PostSlice = createSlice({
	name: "Post",
	initialState: {
		posts: [],
		loader: false,
		status: "",
	},
	reducers: {
		startLoadingPosts: (state) => {
			state.status = "loading";
		},
	},
	extraReducers: {
		[LoadPosts.pending]: (state) => {
			state.status = "pending";
			state.loader = true;
		},
		[LoadPosts.fulfilled]: (state, action) => {
			state.posts = action.payload;
			state.status = "fulfilled";
			state.loader = false;
		},
		[LoadPosts.rejected]: (state, action) => {
			state.status = "rejected";
			state.loader = false;
		},
		[PostBtn.pending]: (state) => {
			state.status = "pending";
			state.loader = true;
		},
		[PostBtn.fulfilled]: (state, action) => {
			state.posts.unshift(action.payload);
			state.loader = false;
		},
		[PostBtn.rejected]: (state) => {
			state.status = "rejected";
			state.loader = false;
		},
		[RemoveBtn.pending]: (state) => {
			state.status = "pending";
			state.loader = true;
		},
		[RemoveBtn.fulfilled]: (state, action) => {
			state.posts = state.posts.filter((post) => {
				return post?._id !== action.payload?._id;
			});
			state.status = "fulfilled";
			state.loader = false;
		},
		[RemoveBtn.rejected]: (state) => {
			state.status = "rejected";
			state.loader = false;
		},
		[LikeBtn.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[LikeBtn.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss();
		},
		[LikeBtn.fulfilled]: (state, action) => {
			state.posts = state?.posts?.map((post) => {
				return post._id === action.payload._id ? action.payload : post;
			});

			state.status = "fulfilled";
			toast.dismiss();
		},
		[CommentBtn.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[CommentBtn.fulfilled]: (state, action) => {
			state.posts = state.posts.map((post) => {
				return post?._id === action.payload?._id
					? { ...post, comments: action.payload.comment }
					: post;
			});
			state.status = "fulfilled";
			toast.dismiss();
			toast.success("Comment added successfully");
		},
		[CommentBtn.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss();
		},
		[RemoveComment.pending]: (state) => {
			state.status = "pending";
			toast.loading("Please wait");
		},
		[RemoveComment.fulfilled]: (state, action) => {
			let post = state.posts.find((post) => {
				return post._id === action.payload._id;
			});
			if (post) post.comments = action.payload.comments;

			state.status = "fulfilled";
			toast.dismiss();
			toast.success("Comment removed successfully");
		},
		[RemoveComment.rejected]: (state) => {
			state.status = "rejected";
			toast.dismiss();
		},
	},
});
export const { startLoadingPosts } = PostSlice.actions;
export default PostSlice.reducer;
