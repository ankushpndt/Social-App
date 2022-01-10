import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from './index';
import { useParams } from 'react-router';
import { followUser } from './userSlice';
import { v4 as uuidv4 } from 'uuid';
export const Followers = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  // console.log(auth);
  // console.log(user);
  const findCurrentUser = user?.find((user) => user?._id === userId);
  console.log(findCurrentUser);
  const follower = findCurrentUser?.followers?.find(
    (id) => id !== findCurrentUser.userId
  );
  console.log(follower);
  return (
    <div key={uuidv4()}>
      <p>{findCurrentUser?.userId} Followers</p>

      {/* <button onClick={() => dispatch(followUser({ userId }))}>
        Follow
      </button> */}
      {findCurrentUser?.followers?.map((item) => {
        return (
          <div key={uuidv4()}>
            <UserCard userId={item} key={item} />

            <button
              onClick={() =>
                dispatch(
                  followUser({ _id: item, token, userToBeFollowed: follower })
                )
              }
            >
              Follow
            </button>
          </div>
        );
      })}
    </div>
  );
};
