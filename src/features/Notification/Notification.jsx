import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { getNotification, clearNotification } from "./notificationSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";
import { NavLink } from "react-router-dom";

export const Notification = ({ socket, open, anchorEl, handleClose }) => {
	const notifications = useSelector(
		(state) => state.notification.notifications
	);

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
			<div className="notifications">
				<Menu
					id="basic-menu"
					anchorEl={anchorEl}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button",
					}}
					disableScrollLock={true}
					sx={{ paddingTop: "0", paddingBottom: "0" }}
				>
					{notifications?.length > 0 ? (
						notifications?.map((notification) => {
							return (
								<div key={uuidv4()}>
									<div className="display__noti">
										<p
											style={{
												display: "flex",

												padding: "0 0.3rem",
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
														<MenuItem>
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
														</MenuItem>
													) : notification?.notificationType === "LIKE" ? (
														<MenuItem>
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
														</MenuItem>
													) : notification?.notificationType === "FOLLOW" ? (
														<MenuItem>
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
														</MenuItem>
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
										</p>
									</div>
								</div>
							);
						})
					) : (
						<div style={{ padding: "1rem" }}>No notifications here.</div>
					)}
				</Menu>
			</div>
		</div>
	);
};
