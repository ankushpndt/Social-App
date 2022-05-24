import { useDispatch, useSelector } from "react-redux";
import { UserCard } from "./index";
import { unfollowUser } from "./userSlice";
import { useParams } from "react-router";
import { Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
export const Following = () => {
	const dispatch = useDispatch();
	const userId = useParams();
	const user = useSelector((state) => state.user.users.user);
	const auth = useSelector((state) => state.auth.login);
	const { token } = auth;

	const findCurrentUser = user?.find((user) => user?._id === userId?.userId);

	return (
		<div style={{ padding: "1rem" }}>
			<p>{findCurrentUser?.userId} Following</p>
			{findCurrentUser?.following?.length > 0 ? (
				findCurrentUser?.following?.map((id) => {
					return (
						<div key={uuidv4()} className="followers">
							<UserCard userId={id} key={id} />
							{findCurrentUser?._id === auth?.userId && (
								<Button
									size="small"
									variant="contained"
									id="btn__contained"
									onClick={() =>
										dispatch(
											unfollowUser({
												_id: findCurrentUser._id,
												token,
												following: id,
											})
										)
									}
								>
									Remove
								</Button>
							)}
						</div>
					);
				})
			) : (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "80vh",
					}}
				>
					No one followed you yet.
				</div>
			)}
		</div>
	);
};
