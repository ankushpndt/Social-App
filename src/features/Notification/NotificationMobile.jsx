import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { getNotification, clearNotification } from "./notificationSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import { NavLink } from "react-router-dom";
import "../../App.css";
import { Loader } from "../../Components/Loader";
const NotificationMobile = ({ socket }) => {
	const notifications = useSelector(
		(state) => state.notification.notifications
	);
	const loader = useSelector((state) => state.post.loader);
	const dispatch = useDispatch();
	useEffect(() => {
		try {
			socket.on("getNotification", (data) => {
				dispatch(getNotification(data));
			});
		} catch (error) {
			toast.error(error?.response?.data?.message, {
				position: "bottom-center",
				autoClose: 3000,
				hideProgressBar: true,
			});
		}
	}, [socket, dispatch]);

	const clearNotifications = ({ id, receiverId }) => {
		socket?.emit("sendClearNotification", {
			id,
			receiverId,
		});
		socket?.on("getClearNotification", (data) => {
			dispatch(clearNotification(data));
		});
	};
	return (
		<div>
			{!loader ? (
				<div className="notifications__mobile">
					{notifications?.length > 0 ? (
						notifications?.map((notification) => {
							return (
								<div key={uuidv4()}>
									<div style={{ borderBottom: "2px solid rgb(240,240,240)" }}>
										<div
											style={{
												display: "flex",
												justifyContent: "space-between",
												padding: "1rem",
											}}
										>
											<NavLink
												to={
													notification?.notificationType === "FOLLOW"
														? `/user/${notification?.source?._id}`
														: `/post/${notification?.postId}`
												}
												style={{ textDecoration: "none", color: "black" }}
											>
												<>
													{notification?.notificationType === "COMMENT" ? (
														<div>
															<span className="notification">
																{" "}
																<img
																	src={notification?.source?.image}
																	width="30px"
																	height="30px"
																	style={{ borderRadius: "90%" }}
																	alt="profile pic"
																/>
																{notification?.source?.name} commented on your
																post{" "}
															</span>
														</div>
													) : notification?.notificationType === "LIKE" ? (
														<div>
															<span className="notification">
																{" "}
																<img
																	src={notification?.source?.image}
																	width="30px"
																	height="30px"
																	style={{ borderRadius: "90%" }}
																	alt="profile pic"
																/>
																{notification?.source?.name} liked your post
															</span>
														</div>
													) : notification?.notificationType === "FOLLOW" ? (
														<div>
															<span className="notification">
																{" "}
																<img
																	src={notification?.source?.image}
																	width="30px"
																	height="30px"
																	style={{ borderRadius: "90%" }}
																	alt="profile pic"
																/>
																{notification?.source?.name} followed you
															</span>
														</div>
													) : (
														"There are no notifications."
													)}
												</>
											</NavLink>
											<button
												className="n__button"
												onClick={() =>
													clearNotifications({
														id: notification?._id,
														receiverId: notification?.target,
													})
												}
											>
												<DeleteIcon />
											</button>
										</div>
									</div>
								</div>
							);
						})
					) : (
						<div style={{ padding: "1rem" }}>No notifications here.</div>
					)}
				</div>
			) : (
				<Loader />
			)}
		</div>
	);
};

export default NotificationMobile;
