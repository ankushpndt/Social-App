import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import { Post } from "../Post/Post";
import { Button } from "@mui/material";
import "./User.css";
import { followUser, LoadUsers, unfollowUser } from "../User/userSlice";
import { Loader } from "../../Components/Loader";
// import { userPosts } from "../Post/userPostSlice";
import LockIcon from "@mui/icons-material/Lock";
export const User = ({ socket }) => {
	const { userId } = useParams();
	const user = useSelector((state) => state?.user?.users?.user);
	const CurrentUser = user?.find((user) => user?._id === userId);
	const auth = useSelector((state) => state?.auth?.login);
	const loader = useSelector((state) => state.usersPost.loader);
	// const userPost = useSelector((state) => state.usersPost.userPost);
	const postData = useSelector((state) => state.post.posts);
	const { token } = auth;
	const dispatch = useDispatch();
	const findCurrentUser = user?.find((user) => user?._id === auth?.userId);
	const followedUsers = postData?.filter((item) => item.userId === userId);
	useEffect(() => {
		dispatch(LoadUsers());
		// dispatch(userPosts({ userId }));
	}, [dispatch, userId]);
	return (
		<>
			{!loader ? (
				<div style={{ margin: "1rem" }}>
					<div className="user__container">
						<img
							src={CurrentUser?.image}
							width="100px"
							height="100px"
							style={{ borderRadius: "80%" }}
							alt="userpic"
						/>
						<p>Name: {CurrentUser?.name}</p>
						<p>Email: {CurrentUser?.email} </p>
						<p>Bio: {CurrentUser?.bio}</p>
					</div>
					<div
						style={{
							display: "flex",
							gap: "1rem",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						{CurrentUser?._id === auth?.userId && (
							<NavLink
								to={`/user/${CurrentUser?._id}/editprofile`}
								style={{
									textDecoration: "none",
									color: "black",
								}}
							>
								<Button size="small" variant="contained" id="btn__contained">
									Edit Profile
								</Button>
							</NavLink>
						)}
						{!findCurrentUser?.following.includes(userId) && (
							<Button
								variant="contained"
								id="btn__contained"
								style={{ padding: " 0.2rem 0.5rem" }}
								onClick={() => {
									if (user._id !== auth.userId) {
										dispatch(
											followUser({
												_id: auth?.userId,
												token,
												userToBeFollowed: userId,
											})
										);
										socket?.emit("sendNotification", {
											senderId: auth?.userId,

											receiverId: user._id,
											type: "FOLLOW",
										});
									}
								}}
							>
								Follow
							</Button>
						)}
						{findCurrentUser?.following.includes(userId) && (
							<Button
								id="btn__contained"
								variant="contained"
								style={{ padding: "0.1rem 0.5rem" }}
								onClick={() => {
									dispatch(
										unfollowUser({
											_id: auth?.userId,
											token,
											following: userId,
										})
									);
								}}
							>
								Unfollow
							</Button>
						)}
						<NavLink
							to={
								findCurrentUser?.following.includes(userId)
									? `/user/${CurrentUser?._id}/followers`
									: `/user/${CurrentUser?._id}`
							}
							style={{
								textDecoration: "none",
								color: "black",
							}}
						>
							<Button size="small" variant="contained" id="btn__contained">
								Followers {CurrentUser?.followers.length}
							</Button>
						</NavLink>
						<NavLink
							to={
								findCurrentUser?.following.includes(userId)
									? `/user/${CurrentUser?._id}/following`
									: `/user/${CurrentUser?._id}`
							}
							style={{
								textDecoration: "none",
								color: "black",
							}}
						>
							<Button size="small" variant="contained" id="btn__contained">
								Following {CurrentUser?.following.length}
							</Button>
						</NavLink>
					</div>
					{findCurrentUser?.following.includes(userId) ? (
						<div className="user__account">
							<h4 style={{ padding: "1rem 0" }}>{CurrentUser?.name}'s Posts</h4>
							{followedUsers.length > 0 ? (
								<>
									{followedUsers.map((post, i) => {
										return (
											<div key={i}>
												<Post postItem={post} />
											</div>
										);
									})}
								</>
							) : (
								<div>{CurrentUser?.name} hasn't posted anything yet.</div>
							)}
						</div>
					) : (
						<div className="private__account">
							<p>
								<LockIcon sx={{ width: "3rem", height: "3rem" }} />
							</p>
							<p>This account is private.</p>
							<small style={{ color: "gray" }}>
								Follow this account to see their posts.
							</small>
						</div>
					)}
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};
