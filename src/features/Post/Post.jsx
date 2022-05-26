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
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavLink } from "react-router-dom";
import { unfollowUser } from "../User/userSlice";
import { addBookmark, deleteBookmark } from "../Bookmark/BookmarkSlice";
export const Post = ({ postItem, socket }) => {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);

	const [commentData, setCommentData] = useState([]);
	const users = useSelector((state) => state?.user?.users?.user);
	const auth = useSelector((state) => state?.auth?.login);
	const bookmark = useSelector((state) => state?.bookmark?.bookmarks);
	const checkInBookmark = bookmark?.find(
		(item) => item?.postId === postItem?._id
	);

	const { userId, token } = auth;
	const loggedInUser = users?.find((user) => user?._id === userId);

	const peopleWhoLoggedInUserFollows = loggedInUser?.following;

	const showFollowingWhichLoggedInUserFollows =
		peopleWhoLoggedInUserFollows?.find((userId) => postItem?.userId === userId);

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
					toast.dark(err?.response?.data?.message);
				}
			}
		})();
		return () => {
			console.log("unmounting post");
			source.cancel();
		};
	}, [postItem, setCommentData]);

	return (
		<div>
			<div key={uuidv4()} className="user__posts">
				<div className="user__profile">
					{users?.map(
						(user) =>
							user?._id === postItem?.userId && (
								<div className="user__details" key={uuidv4()}>
									<NavLink
										to={
											postItem?.userId === auth?.userId
												? `/account/${auth?.userId}`
												: `/user/${postItem?.userId}`
										}
										style={{
											textDecoration: "none",
											color: "black",
											display: "flex",
											alignItems: "center",
										}}
									>
										<img
											src={user.image}
											alt="userImage"
											width="30px"
											height="30px"
											style={{ borderRadius: "80%" }}
										/>
										<p style={{ margin: "0.5rem" }}>{user.name}</p>
									</NavLink>
								</div>
							)
					)}
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							gap: "0.5rem",
							alignItems: "center",
						}}
					>
						{Boolean(showFollowingWhichLoggedInUserFollows) && (
							<Button
								id="btn__contained"
								variant="contained"
								style={{ padding: "0.1rem 0.5rem" }}
								onClick={() => {
									dispatch(
										unfollowUser({
											_id: userId,
											token,
											following: postItem?.userId,
										})
									);
								}}
							>
								Unfollow
							</Button>
						)}
						{
							<div className="bookmark__btn">
								<button
									style={{
										background: "transparent",
										border: "none",
										cursor: "pointer",
									}}
								>
									{Boolean(checkInBookmark) ? (
										<BookmarkIcon
											onClick={() =>
												checkInBookmark?.postId === postItem?._id &&
												dispatch(
													deleteBookmark({ bookmarkId: checkInBookmark?._id })
												)
											}
										/>
									) : (
										<BookmarkBorderOutlinedIcon
											onClick={() =>
												dispatch(addBookmark({ userId, postId: postItem?._id }))
											}
										/>
									)}
								</button>
							</div>
						}
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
				</div>
				<div className="post__image">
					{postItem?.media && (
						<div
							style={{ padding: "1rem 0", borderBottom: "1px solid #dcdcdc" }}
						>
							<img
								src={postItem?.media}
								alt="post pic"
								style={{
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
								display: "flex",
								justifyContent: "space-around",
								alignItems: "center",
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

									{findUser ? <ThumbUpAltIcon /> : <ThumbUpOutlinedIcon />}
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
													justifyContent: "space-between",
													alignItems: "center",
													padding: "0.5rem",
													borderBottom: "1px solid #dcdcdc",
												}}
											>
												<span
													style={{
														display: "flex",
														alignItems: "center",
													}}
												>
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
																textAlign: "left",
															}}
														>
															{findUserPic?.name}
														</p>
														<p style={{ textAlign: "left" }}>{item?.comment}</p>
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
