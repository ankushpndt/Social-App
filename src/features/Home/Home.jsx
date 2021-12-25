import { Post } from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { CreatePost } from '../Post/CreatePost';
import { followUser } from '../User/userSlice';
import { useLocation } from 'react-router-dom';
export const Home = () => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);
  console.log(auth);
  const { token } = auth;
  const findCurrentUser = user?.find((user) => user?.name !== auth.user);
  console.log(findCurrentUser);
  const userToBeFollowed = findCurrentUser?._id;
  console.log(userToBeFollowed);
  console.log(user);
  return (
    <div>
      <h2>Home</h2>
      <CreatePost />
      <div style={{ display: 'flex' }}>
        <div className='posts' style={{ width: '70%' }}>
          {postData
            ?.slice(0)
            .reverse()
            .map((item) => (
              <Post postItem={item} key={item?._id} />
            ))}
        </div>
        <div className='people__to__follow' style={{ width: '30%' }}>
          <h4>People who you can follow</h4>
          {user?.map((user) => (
            <div key={uuidv4()}>
              <p>{user?.name}</p>
              <button
                onClick={() =>
                  user._id !== auth.userId
                    ? dispatch(
                        followUser({
                          _id: auth?.userId,
                          token,
                          userToBeFollowed,
                        })
                      )
                    : ''
                }
              >
                Follow
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
