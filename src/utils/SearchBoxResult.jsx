import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const SearchBoxResult = ({ user, setToggleDropbox }) => {
	const auth = useSelector((state) => state.auth.login);

	return (
		<Link
			to={
				user._id === auth?.userId ? `/account/${user._id}` : `/user/${user._id}`
			}
			onClick={setToggleDropbox ? () => setToggleDropbox(false) : () => {}}
			className="search__box__result"
		>
			<div className="avatar">
				<img className="avatar__img" src={user.image} alt="avatar" />
			</div>
			<div className="result__content">
				<h5 className="username">{user.name}</h5>
			</div>
		</Link>
	);
};
