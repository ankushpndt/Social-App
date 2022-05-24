import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useParams } from "react-router";
import axios from "axios";
import { API_URL } from "../../utils/API_URL";
import { Post } from "../Post/Post";
import { Button } from "@mui/material";
import "./User.css";
import { followUser, LoadUsers, unfollowUser } from "../User/userSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const User = ({ socket }) => {
	const { userId } = useParams();
	const [specificUserPost, setSpecificUserPost] = useState([]);
	const user = useSelector((state) => state?.user?.users?.user);
	const CurrentUser = user?.find((user) => user?._id === userId);
	const auth = useSelector((state) => state?.auth?.login);
	const { token } = auth;
	const dispatch = useDispatch();
	const findCurrentUser = user?.find((user) => user?._id === auth?.userId);
	console.log(user);
	useEffect(() => {
		let source = axios.CancelToken.source();
		(async () => {
			try {
				const response = await axios.get(`${API_URL}/post/${userId}`);
				setSpecificUserPost(response.data.userPosts);
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
			console.log("unmounting account");
			source.cancel();
		};
	}, [userId]);
	useEffect(() => dispatch(LoadUsers()), [dispatch]);

	return (
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
				{!findCurrentUser?.following.includes(userId) &&
					!findCurrentUser?._id !== auth?.userId && (
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
						Following
					</Button>
				)}
				<NavLink
					to={`/user/${CurrentUser?._id}/followers`}
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
					to={`/user/${CurrentUser?._id}/following`}
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
			<div className="user__account">
				<h4 style={{ padding: "1rem 0" }}>{CurrentUser?.name}'s Posts</h4>
				{specificUserPost.length > 0 ? (
					<>
						{specificUserPost.map((post, i) => {
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
		</div>
	);
};
