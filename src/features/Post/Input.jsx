import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentBtn } from "./postSlice";
import { AddNotifications } from "../Notification/notificationSlice";
import { Button, TextField } from "@mui/material";
import "./Post.css";
export default function Input({ postItem, socket }) {
	const dispatch = useDispatch();
	const post = useSelector((state) => state.post);
	const [commentValue, setCommentValue] = useState("");
	const auth = useSelector((state) => state.auth.login);

	const { userId } = auth;

	return (
		<div className="input__comment">
			<TextField
				id="filled__comment"
				variant="standard"
				type="text"
				value={commentValue}
				label="Comment here"
				onChange={(e) => {
					setCommentValue(e.target.value);
				}}
			/>
			<Button
				size="small"
				variant="contained"
				id="btn__contained"
				onClick={() => {
					dispatch(
						CommentBtn({
							postId: postItem?._id,
							comment: commentValue,
							userId,
						})
					);
					setCommentValue("");
					socket?.emit("sendNotification", {
						postId: postItem?._id,
						senderId: userId,
						receiverId: postItem?.userId,
						type: "COMMENT",
					});
				}}
			>
				{post.status === "pending" ? "Commenting..." : "Comment"}
			</Button>
		</div>
	);
}
