import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "../Post/Post.css";
import { useEffect } from "react";
import { API_URL } from "../../utils/API_URL";
import axios from "axios";
import { Post } from "../Post/Post";
import { Button } from "@mui/material";
import { useParams } from "react-router";
export const Account = () => {
	const [singlePost, setSinglePost] = useState([]);
	const user = useSelector((state) => state.user.users.user);
	const auth = useSelector((state) => state.auth.login);

	const CurrentUser = user?.find((user) => user._id === auth.userId);
	const { userId } = useParams();
	useEffect(() => {
		let abortCont = new AbortController();
		(async () => {
			try {
				const response = await axios.get(`${API_URL}/post/${userId}`, {
					signal: abortCont.signal,
				});
				setSinglePost(response.data.userPosts);
			} catch (err) {
				console.log(err);
				if (err.name === "AbortError") {
					console.log(err);
				}
			}
		})();
		return () => abortCont.abort();
	}, [userId]);

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
				{singlePost.map((post, i) => {
					return (
						<div key={i}>
							<Post postItem={post} />
						</div>
					);
				})}
			</div>
		</div>
	);
};
