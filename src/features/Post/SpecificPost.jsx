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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink, useParams } from "react-router-dom";

export const SpecificPost = ({ socket }) => {
	const { postId } = useParams();
	const postData = useSelector((state) => state.post.posts);
	const postItem = postData?.find((el) => el?._id === postId);
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const [commentData, setCommentData] = useState([]);
	const users = useSelector((state) => state.user.users.user);
	const auth = useSelector((state) => state.auth.login);

	const { userId } = auth;

	const findUser = postItem?.likes?.find((likesId) => likesId === userId);
	let findUserPic;

	useEffect(() => {
		let source = axios.CancelToken.source();
		(async () => {
			try {
				const response = await axios.get(
					`${API_URL}/post/${postItem?._id}/comment`,
					{ cancelToken: source.token }
				);
				setCommentData(response.data.comments);
			} catch (err) {
				if (axios.isCancel(err)) {
					console.log("caught cancelToken error");
				} else {
					toast.dark(err?.response?.data?.message, {
						position: "bottom-center",
						autoClose: 3000,
						hideProgressBar: true,
					});
				}
			}
		})();
		return () => {
			console.log("unmounting post");
			source.cancel();
		};
	}, [postItem, setCommentData]);
	return (
		<div style={{ padding: "1rem" }}>
			<div key={uuidv4()} className="user__posts">
				<div className="user__profile">
					{users?.map(
						(user) =>
							user?._id === postItem?.userId && (
								<div className="user__details" key={uuidv4()}>
									<NavLink
										to={`/user/${postItem?.userId}`}
										style={{
											textDecoration: "none",
											color: "black",
											display: "flex",
											alignItems: "center",
										}}
									>
										<img
											src={user.image}
											alt=""
											width="30px"
											height="30px"
											style={{ borderRadius: "80%" }}
										/>
										<p style={{ margin: "1rem" }}>{user.name}</p>
									</NavLink>
								</div>
							)
					)}

					{postItem?.userId === auth?.userId && (
						<div className="delete__btn">
							<button
								style={{
									background: "transparent",
									border: "none",
									cursor: "pointer",
								}}
								onClick={() =>
									dispatch(RemoveBtn({ postId: postItem?._id, userId }))
								}
							>
								<DeleteIcon />
							</button>
						</div>
					)}
				</div>
				<div className="post__image">
					{postItem?.media && (
						<div>
							<img
								src={postItem?.media}
								alt="post pic"
								style={{
									paddingTop: "1rem",
									width: "100%",
									maxWidth: "300px",
									height: "100%",
									maxHeight: "300px",
								}}
							/>
						</div>
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
										{postItem?.likes?.length > 0
											? postItem?.likes?.length
											: 0}{" "}
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
						{show && (
							<div>
								<div id="comment__data">
									{commentData.map((item, i) => {
										findUserPic = users?.find((el) => el._id === item?.userId);

										return (
											<div
												key={i}
												style={{
													display: "flex",
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
														<button
															style={{
																background: "transparent",
																border: "none",
																cursor: "pointer",
															}}
															onClick={() =>
																dispatch(
																	RemoveComment({
																		postId: postItem?._id,
																		commentId: item._id,
																	})
																)
															}
														>
															<DeleteIcon />
														</button>
													</span>
												)}
											</div>
										);
									})}
								</div>

								<Input postItem={postItem} socket={socket} />
							</div>
						)}
					</span>
				</div>
			</div>
		</div>
	);
};
