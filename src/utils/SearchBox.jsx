// import Spinner from '../Spinner/Spinner';
import { useSelector } from "react-redux";
import { SearchBoxResult } from "./SearchBoxResult";

import "./SearchBox.css";

export const SearchBox = ({ setToggleDropbox, searchTerm }) => {
	const users = useSelector((state) => state.user.users.user);
	const status = useSelector((state) => state.user.status);

	const searchedUsers = users.filter((user) =>
		user.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<div className="search__box">
			{searchTerm?.length !== 0 && (
				<div className="search__box__results">
					{searchedUsers.map((user) => (
						<SearchBoxResult
							key={user._id}
							user={user}
							setToggleDropbox={setToggleDropbox}
						/>
					))}
				</div>
			)}
			{searchTerm?.length === 0 && (
				<>
					<h4 className="search__box__heading">Search</h4>
					<div className="search__box__empty">Try searching for any user</div>
				</>
			)}
			{searchedUsers?.length === 0 && (
				<>
					<h4 className="search__box__heading">Search</h4>
					<div className="search__box__empty">No results found</div>
				</>
			)}

			{status === "pending" && <>Loading...</>}
		</div>
	);
};
