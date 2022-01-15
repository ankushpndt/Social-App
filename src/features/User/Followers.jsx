import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from './index';
import { useParams } from 'react-router';
import { unfollowUser, followUser } from './userSlice';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';
import '../../style.css';
export const Followers = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  const findCurrentUser = user?.find((user) => user?._id === userId);
  const followings = findCurrentUser?.following;

  return (
    <div key={uuidv4()}>
      <p>{findCurrentUser?.userId} Followers</p>

      {findCurrentUser?.followers?.map((id) => {
        return (
          <div key={uuidv4()} className='followers'>
            <UserCard userId={id} key={id} />
            {followings.includes(id) ? (
              <Button
                size='small'
                variant='contained'
                id='btn__contained'
                onClick={() =>
                  dispatch(
                    unfollowUser({
                      _id: findCurrentUser._id,
                      token,
                      following: id,
                    })
                  )
                }
              >
                Following
              </Button>
            ) : (
              <Button
                size='small'
                variant='contained'
                id='btn__contained'
                onClick={() =>
                  dispatch(
                    followUser({
                      _id: findCurrentUser._id,
                      token,
                      userToBeFollowed: id,
                    })
                  )
                }
              >
                Follow
              </Button>
            )}
            {/* <Button
              size='small'
              variant='contained'
              id='btn__contained'
              onClick={() =>
                dispatch(
                  followUser({
                    _id: findCurrentUser._id,
                    token,
                    userToBeFollowed: id,
                  })
                )
              }
            >
              Follow
            </Button> */}
          </div>
        );
      })}
    </div>
  );
};
