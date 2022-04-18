import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentBtn } from "./postSlice";
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
				label="Add a comment..."
				onChange={(e) => {
					setCommentValue(e.target.value);
				}}
			/>
			<span style={{ cursor: "not-allowed" }}>
				<Button
					size="small"
					variant="contained"
					id="btn__contained"
					disabled={!commentValue}
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
			</span>
		</div>
	);
}
