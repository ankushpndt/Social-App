import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import "../Post/Post.css";
import { useEffect } from "react";
import { API_URL } from "../../utils/API_URL";
import axios from "axios";
import { Post } from "../Post/Post";
import { Button } from "@mui/material";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Components/Loader";
import { LoadPosts } from "../Post/postSlice";
export const Account = () => {
	const [singlePost, setSinglePost] = useState([]);
	const user = useSelector((state) => state.user.users.user);
	const auth = useSelector((state) => state.auth.login);
	const loader = useSelector((state) => state.post.loader);
	const posts = useSelector((state) => state.post.posts);

	const CurrentUserPosts = posts?.find((post) => post.userId === auth?.userId);
	const CurrentPostLikes = CurrentUserPosts?.likes;
	// console.log(CurrentPostLikes);
	const CurrentUser = user?.find((user) => user._id === auth.userId);
	const { userId } = useParams();
	const dispatch = useDispatch();
	useEffect(() => {
		let source = axios.CancelToken.source();
		(async () => {
			try {
				const response = await axios.get(`${API_URL}/post/${userId}`, {
					cancelToken: source.token,
				});
				setSinglePost(response.data.userPosts);
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
	useEffect(() => {
		dispatch(LoadPosts({ userId }));
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
							padding: "1rem",
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
						{singlePost?.length > 0 ? (
							<>
								{singlePost.map((post, i) => {
									return (
										<div key={i}>
											<Post postItem={post} />
										</div>
									);
								})}
							</>
						) : (
							<div>No posts yet.</div>
						)}
					</div>
				</div>
			) : (
				<Loader />
			)}
		</>
	);
};
