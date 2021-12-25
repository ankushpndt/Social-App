import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from './index';
import { unfollowUser } from './userSlice';
import { useParams } from 'react-router';
export const Following = () => {
  const dispatch = useDispatch();
  const userId = useParams();
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  // console.log(auth);
  // console.log(user);
  console.log(userId);
  const findCurrentUser = user?.find((user) => user?._id === userId?.userId);
  console.log(findCurrentUser);
  const following = findCurrentUser?.following?.find(
    (id) => id !== findCurrentUser._id
  );
  console.log(following);
  return (
    <div>
      <p>{findCurrentUser?.userId} Following</p>

      {/* <button onClick={() => dispatch(unfollowUser(findCurrentUser?._id))}>
        Following
      </button> */}
      {findCurrentUser?.following?.map((item, i) => {
        return (
          <div key={i}>
            <UserCard userId={item} key={item} />
            <button
              onClick={() =>
                dispatch(
                  unfollowUser({ _id: findCurrentUser._id, token, following })
                )
              }
            >
              Following
            </button>
          </div>
        );
      })}
    </div>
  );
};
