import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import "./User.css";
export const UserCard = ({ userId }) => {
	const user = useSelector((state) => state.user.users.user).find(
		(el) => el._id === userId
	);

	const navigate = useNavigate();
	return (
		<div>
			<div
				className="usercard__profile"
				onClick={() => navigate(`/user/${user._id}`)}
			>
				<img
					src={user?.image}
					alt=""
					width="30px"
					height="30px"
					style={{ borderRadius: "80%" }}
				/>
				<p>{user.name}</p>
			</div>
		</div>
	);
};
