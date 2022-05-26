import { useState } from "react";
import "../App.css";
import { SearchBox } from "../utils/SearchBox";
import { Backdrop } from "../utils/Backdrop";
import useDebounce from "../CustomHooks/useDebounce";
export const SearchBar = () => {
	const [toggleDropbox, setToggleDropbox] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearchTerm = useDebounce(searchTerm, 1000);

	return (
		<div>
			<div className="search__bar">
				{toggleDropbox && (
					<Backdrop
						toggle={setToggleDropbox}
						className="search__bar__backdrop"
					/>
				)}

				<input
					type="search"
					value={searchTerm}
					onChange={(e) => {
						setSearchTerm(e.target.value);
						setToggleDropbox(true);
					}}
					className="search__input"
					placeholder="Search"
				/>
				{toggleDropbox && (
					<SearchBox
						setToggleDropbox={setToggleDropbox}
						searchTerm={debouncedSearchTerm}
					/>
				)}
			</div>
		</div>
	);
};
