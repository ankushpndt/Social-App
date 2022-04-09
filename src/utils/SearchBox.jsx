// import Spinner from '../Spinner/Spinner';
import { useSelector } from "react-redux";
import { SearchBoxResult } from "./SearchBoxResult";

import "./SearchBox.css";

export const SearchBox = ({ setToggleDropbox, searchTerm }) => {
	const users = useSelector((state) => state.user.users.user);
	const searchedUsers = users.filter((user) =>
		user.name.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<div className="searchBox">
			{searchTerm?.length !== 0 && (
				<div className="searchBox__results">
					{searchedUsers.map((user) => (
						<SearchBoxResult
							key={user._id}
							user={user}
							setToggleDropbox={setToggleDropbox}
						/>
					))}
				</div>
			)}

			{(searchTerm?.length === 0 || searchedUsers?.length === 0) && (
				<>
					<h4 className="searchBox__heading">Search</h4>
					<div className="searchBox__empty">No results found</div>
				</>
			)}

			{searchedUsers?.status === "pending" && <>Loading...</>}
		</div>
	);
};
