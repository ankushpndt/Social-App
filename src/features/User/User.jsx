import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
export const User = () => {
  const [post, setPost] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log(userId);
  const user = useSelector((state) => state.user.users.user);
  console.log(user);
  const CurrentUser = user?.find((user) => user._id === userId);
  console.log(CurrentUser);
  const navigate = useNavigate();
  return (
    <div>
      <img src={CurrentUser?.image} width='300px' />
      <p>{CurrentUser?.name}</p>
      <p>{CurrentUser?.email} </p>
      <p>Bio:{CurrentUser?.bio}</p>
      <NavLink to='/home'>Posts</NavLink>
      <NavLink to={`/${CurrentUser?._id}/editprofile`}>Edit Profile</NavLink>
      <NavLink to={`/${CurrentUser?.name}/followers`}>Followers</NavLink>
      <NavLink to={`/${CurrentUser?.name}/following`}>Following</NavLink>
    </div>
  );
};
