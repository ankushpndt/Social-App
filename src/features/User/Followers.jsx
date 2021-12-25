import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from './index';
import { useParams } from 'react-router';
import { followUser } from './userSlice';
export const Followers = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  // console.log(auth);
  // console.log(user);
  const findCurrentUser = user?.find((user) => user?.name === name);
  console.log(findCurrentUser);
  const follower = findCurrentUser?.following?.find(
    (id) => id !== findCurrentUser._id
  );
  return (
    <div>
      <p>{findCurrentUser?.name} Followers</p>

      {/* <button onClick={() => dispatch(followUser({ userId }))}>
        Follow
      </button> */}
      {findCurrentUser?.followers?.map((item) => {
        return (
          <>
            <UserCard userId={item} key={item} />
            <button
              onClick={() =>
                dispatch(followUser({ _id: item, token, follower }))
              }
            >
              Following
            </button>
          </>
        );
      })}
    </div>
  );
};
