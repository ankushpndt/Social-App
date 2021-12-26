import { Post } from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { CreatePost } from '../Post/CreatePost';
import { followUser } from '../User/userSlice';
import { Button } from '@mui/material';
import '../Post/Post.css';
export const Home = () => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.posts);
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);

  const { token } = auth;
  const findCurrentUser = user?.find((user) => user?.name !== auth.user);

  const userToBeFollowed = findCurrentUser?._id;

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
              <Button
                variant='contained'
                id='btn__contained'
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
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
