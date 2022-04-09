import axios from "axios";
import "./Post.css";
import { useDispatch, useSelector } from "react-redux";
import { API_URL } from "../../utils/API_URL";
import { v4 as uuidv4 } from "uuid";
import { LikeBtn, RemoveBtn, RemoveComment } from "./postSlice";
import { useState, useEffect } from "react";
import Input from "./Input";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CommentIcon from "@mui/icons-material/Comment";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
export const Post = ({ postItem, socket }) => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const [commentData, setCommentData] = useState([]);
	const users = useSelector((state) => state.user.users.user);
	const auth = useSelector((state) => state.auth.login);

	const { userId } = auth;

	const findUser = postItem.likes.find((likesId) => likesId === userId);
	let findUserPic;

	useEffect(() => {
		(async () => {
			const response = await axios.get(
				`${API_URL}/post/${postItem?._id}/comment`
			);

			setCommentData(response.data.comments);
		})();
		return () => {};
	}, [postItem, setCommentData]);

	return (
		<div>
			<div key={uuidv4()} className="user__posts">
				<div className="user__profile">
					{users?.map(
						(user) =>
							user?._id === postItem?.userId && (
								<div className="user__details" key={uuidv4()}>
									<img
										src={user.image}
										alt=""
										width="30px"
										height="30px"
										style={{ borderRadius: "80%" }}
									/>
									<p style={{ margin: "1rem" }}>{user.name}</p>
								</div>
							)
					)}

					{postItem?.userId === auth?.userId && (
						<div className="delete__btn">
							<Button
								size="small"
								variant="contained"
								startIcon={<DeleteIcon />}
								id="btn__contained"
								onClick={() =>
									dispatch(RemoveBtn({ postId: postItem?._id, userId }))
								}
							>
								Delete
							</Button>
						</div>
					)}
				</div>
				<div className="post__image">
					{postItem?.media ? (
						<div>
							<img
								src={postItem?.media}
								alt="post pic"
								height="250px"
								style={{ paddingTop: "1rem", width: "100%", maxWidth: "300px" }}
							/>
						</div>
					) : (
						""
					)}
				</div>
				<div className="post__desc">{postItem?.description}</div>
				<div className="post__btn">
					<span>
						<div
							style={{
								borderBottom: "1px solid #dcdcdc",
								paddingBottom: "1rem",
							}}
						>
							<Button
								size="small"
								variant="contained"
								id="btn__contained"
								onClick={() => {
									if (findUser) {
										dispatch(
											LikeBtn({ postId: postItem?._id, userId: auth?.userId })
										);
									} else {
										dispatch(
											LikeBtn({ postId: postItem?._id, userId: auth?.userId })
										);

										socket?.emit("sendNotification", {
											postId: postItem?._id,
											senderId: userId,
											receiverId: postItem?.userId,
											type: "LIKE",
										});
									}
								}}
							>
								<div className="like__btn" style={{ display: "flex" }}>
									<span style={{ fontSize: "1rem", paddingRight: "5px" }}>
										{" "}
										{postItem?.likes?.length < 1
											? ""
											: postItem?.likes?.length}{" "}
									</span>

									<ThumbUpAltIcon />
								</div>
							</Button>{" "}
							<Button
								size="small"
								variant="outlined"
								id="btn__outlined"
								onClick={() => postItem?._id && setShow((show) => !show)}
							>
								<CommentIcon />
							</Button>
						</div>
						{show ? (
							<div>
								<div id="comment__data">
									{commentData.map((item, i) => {
										findUserPic = users?.find((el) => el._id === item?.userId);

										return (
											<div
												key={i}
												style={{
													display: "flex",
													justifyContent: "space-around",
													alignItems: "center",
													padding: "0.5rem",
													borderBottom: "1px solid #dcdcdc",
												}}
											>
												<span style={{ display: "flex", alignItems: "center" }}>
													<img
														src={findUserPic?.image}
														alt="userpic"
														className="home__usercard__profile__image"
													/>
													<span
														style={{
															paddingLeft: "0.5rem",
														}}
													>
														<p
															style={{
																paddingBottom: "0.5rem",
																fontWeight: "bold",
															}}
														>
															{findUserPic?.name}
														</p>
														<p>{item?.comment}</p>
													</span>
												</span>
												{item?.userId === userId && (
													<span>
														<Button
															size="small"
															variant="contained"
															id="btn__contained"
															startIcon={<DeleteIcon />}
															onClick={() =>
																dispatch(
																	RemoveComment({
																		postId: postItem._id,
																		commentId: item._id,
																	})
																)
															}
														>
															Delete
														</Button>
													</span>
												)}
											</div>
										);
									})}
								</div>

								<Input postItem={postItem} socket={socket} />
							</div>
						) : (
							""
						)}
					</span>
				</div>
			</div>
		</div>
	);
};
