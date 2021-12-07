import { Post } from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { CreatePost } from '../Post/CreatePost';
export const Home = () => {
  const postData = useSelector((state) => state.post.posts);

  return (
    <div>
      <h2>Home</h2>
      <CreatePost />
      <div className='posts'>
        {postData
          .slice(0)
          .reverse()
          .map((item) => (
            <Post postItem={item} key={item?._id} />
          ))}
      </div>
    </div>
  );
};
