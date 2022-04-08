import { Post } from "../Post/Post";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { CreatePost } from "../Post/CreatePost";
import { followUser } from "../User/userSlice";
import { Button } from "@mui/material";
import "../Post/Post.css";
import { Loader } from "../../Components/Loader";
export const Home = ({ socket }) => {
	const dispatch = useDispatch();
	const postData = useSelector((state) => state.post.posts);
	const users = useSelector((state) => state.user.users.user);
	const auth = useSelector((state) => state.auth.login);
	const loader = useSelector((state) => state.post.loader);
	const { token } = auth;
	const showUsersToBeFollowed = users?.filter(
		(user) => user._id !== auth?.userId
	);
	const findCurrentUser = users?.find((user) => user?._id === auth?.userId);

	const currentUserFollowing = findCurrentUser?.following;
	const navigate = useNavigate();
	return (
		<div className="home__container">
			{!loader ? (
				<>
					<h2>Home</h2>
					<div className="createpost__container">
						<CreatePost />
					</div>
					<div className="posts__container">
						<div className="posts">
							{postData?.length > 0 ? (
								postData
									?.slice(0)
									.reverse()
									.map((item) => (
										<Post
											postItem={item}
											key={item?._id}
											userName={auth?.user}
											socket={socket}
										/>
									))
							) : (
								<div style={{ padding: "1rem" }}>You have no posts yet.</div>
							)}
						</div>
						<div className="who__to__follow">
							<h4>Who to follow</h4>
							<div className="who__to__follow__details">
								{showUsersToBeFollowed?.map((user) => (
									<div key={uuidv4()}>
										{
											<>
												{currentUserFollowing?.includes(user?._id) ? (
													""
												) : (
													<div className="home__usercard__profile__container">
														<div
															className="home__usercard__profile"
															onClick={() => navigate(`/user/${user._id}`)}
														>
															<img
																className="home__usercard__profile__image"
																src={user?.image}
																alt="profile pic"
															/>

															<p style={{ paddingBottom: "1rem" }}>
																{user?.name}
															</p>
														</div>
														<Button
															variant="contained"
															id="btn__contained"
															onClick={() => {
																if (user._id !== auth.userId) {
																	dispatch(
																		followUser({
																			_id: auth?.userId,
																			token,
																			userToBeFollowed: user._id,
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
													</div>
												)}
											</>
										}
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			) : (
				<Loader />
			)}
		</div>
	);
};
