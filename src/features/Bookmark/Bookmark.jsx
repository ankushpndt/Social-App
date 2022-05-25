import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookmarkCard from "./BookmarkCard";
import { getBookmarks } from "./BookmarkSlice";
import { v4 } from "uuid";
const Bookmarks = () => {
	const dispatch = useDispatch();
	const bookmark = useSelector((state) => state.bookmark.bookmarks);

	const auth = useSelector((state) => state.auth.login);
	const { userId } = auth;
	useEffect(() => {
		dispatch(getBookmarks({ userId }));
	}, [dispatch, userId]);
	return (
		<div style={{ marginBottom: "5rem" }}>
			<ul>
				{bookmark?.map((item) => {
					return (
						<div key={v4()}>
							<BookmarkCard bookmark={item} />
						</div>
					);
				})}
			</ul>
		</div>
	);
};

export default Bookmarks;
