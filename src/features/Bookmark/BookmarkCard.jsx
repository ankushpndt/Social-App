import { useSelector } from "react-redux";
import { Post } from "../Post/Post";
import { v4 } from "uuid";
import "./Bookmark.css";
const BookmarkCard = ({ bookmark }) => {
	const postData = useSelector((state) => state.post.posts);
	const getPostFromBookmark = postData?.filter(
		(item) => item._id === bookmark?.postId
	);

	return (
		<div className="bookmarks">
			{getPostFromBookmark?.map((post) => {
				return (
					<div key={v4}>
						<Post postItem={post} />
					</div>
				);
			})}
		</div>
	);
};

export default BookmarkCard;
