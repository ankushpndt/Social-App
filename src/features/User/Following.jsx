import { useDispatch, useSelector } from 'react-redux';
import { UserCard } from './index';
import { unfollowUser } from './userSlice';
import { useParams } from 'react-router';
export const Following = () => {
  const dispatch = useDispatch();
  const { name } = useParams();
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);
  // console.log(auth);
  // console.log(user);
  const findCurrentUser = user?.find((user) => user?.name === name);
  console.log(findCurrentUser);
  // const { name, _id } = findCurrentUser;
  const { _id } = findCurrentUser;
  return (
    <div>
      <p>{findCurrentUser?.name} Following</p>

      {/* <button onClick={() => dispatch(unfollowUser(findCurrentUser?._id))}>
        Following
      </button> */}
      {findCurrentUser?.following?.map((item) => {
        return (
          <>
            <UserCard userId={item} key={item} />
            <button onClick={() => dispatch(unfollowUser({ _id }))}>
              Following
            </button>
          </>
        );
      })}
    </div>
  );
};
