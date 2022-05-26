import { useSelector } from "react-redux";
import { Post } from "../Post/Post";
import { v4 } from "uuid";
import "./Bookmark.css";

const BookmarkCard = ({ bookmark }) => {
	const everyPosts = useSelector((state) => state.post.allPosts);
	const getPostFromBookmark = everyPosts?.filter((item) => {
		return item._id === bookmark?.postId;
	});

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
