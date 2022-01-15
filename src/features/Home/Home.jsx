import { Post } from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { CreatePost } from '../Post/CreatePost';
import { followUser } from '../User/userSlice';
import { Button } from '@mui/material';
import '../Post/Post.css';
export const Home = ({ socket }) => {
  const dispatch = useDispatch();
  const postData = useSelector((state) => state.post.posts);
  const users = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);

  const { token } = auth;
  const showUsersToBeFollowed = users?.filter(
    (user) => user._id !== auth?.userId
  );
  // console.log(showUsersToBeFollowed);
  const findCurrentUser = users?.find((user) => user?._id === auth?.userId);

  const currentUserFollowing = findCurrentUser?.following;
  console.log(currentUserFollowing);

  return (
    <div>
      <h2>Home</h2>
      <CreatePost />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='posts' style={{ width: '50%' }}>
          {postData
            ?.slice(0)
            .reverse()
            .map((item) => (
              <Post
                postItem={item}
                key={item?._id}
                userName={auth?.user}
                socket={socket}
              />
            ))}
        </div>
        <div className='people__to__follow' style={{ width: '30%' }}>
          <h4>People who you can follow</h4>
          {showUsersToBeFollowed?.map((user) => (
            <div key={uuidv4()}>
              {
                <>
                  {currentUserFollowing?.includes(user?._id) ? (
                    ''
                  ) : (
                    <>
                      <p>{user?.name}</p>

                      <Button
                        variant='contained'
                        id='btn__contained'
                        onClick={() => {
                          if (user._id !== auth.userId) {
                            dispatch(
                              followUser({
                                _id: auth?.userId,
                                token,
                                userToBeFollowed: user._id,
                              })
                            );
                            socket?.emit('sendNotification', {
                              senderId: auth?.userId,

                              receiverId: user._id,
                              type: 'FOLLOW',
                            });
                          }
                        }}
                      >
                        Follow
                      </Button>
                    </>
                  )}
                </>
              }
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
