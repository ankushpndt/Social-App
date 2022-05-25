import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BookmarkIcon from "@mui/icons-material/Bookmark";

import "./Navbar.css";
export const Navbar = () => {
	const auth = useSelector((state) => state.auth.login);
	const { userId } = auth;
	return (
		<div className="bottom__navbar__container">
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to="/home"
				className="bottom__navbar__route"
			>
				<HomeIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "50px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					Home
				</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to="/notifications"
				className="bottom__navbar__route"
			>
				<NotificationsIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "80px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					Notifications
				</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to={`/account/${userId}`}
				className="bottom__navbar__route"
			>
				<AccountCircleIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "50px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					Profile
				</span>
			</NavLink>
			<NavLink
				style={({ isActive }) => {
					return { color: isActive ? "#e74c3c" : "white" };
				}}
				to={"bookmarks"}
				className="bottom__navbar__route"
			>
				<BookmarkIcon />
				<span
					style={{
						fontSize: "small",
						textAlign: "center",
						width: "70px",
						lineHeight: "0.75rem",
						fontWeight: "bold",
					}}
				>
					Bookmark
				</span>
			</NavLink>
		</div>
	);
};
