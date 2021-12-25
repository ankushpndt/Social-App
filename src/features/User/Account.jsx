import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import { userPosts } from '../Post/postSlice';
import { useEffect } from 'react';
import { API_URL } from '../../utils/API_URL';
import axios from 'axios';
import { Post } from '../Post/Post';
export const Account = () => {
  const [singlePost, setSinglePost] = useState([]);

  const [post, setPost] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log(userId);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_URL}/post/${CurrentUser?._id}`);
      setSinglePost(response.data.userPosts);
    })();
  }, []);
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);
  console.log(user);
  const CurrentUser = user?.find((user) => user._id === auth.userId);
  console.log(CurrentUser);
  const navigate = useNavigate();
  console.log(singlePost);
  return (
    <div>
      <img src={CurrentUser?.image} width='300px' />
      <p>{CurrentUser?.name}</p>
      <p>{CurrentUser?.email} </p>
      <p>Bio:{CurrentUser?.bio}</p>
      {/* <NavLink
        to={`/user/${CurrentUser?._id}/post`}
        onClick={() => dispatch(userPosts({ userId: CurrentUser?._id }))}
      >
        Posts
      </NavLink> */}
      <NavLink to={`/user/${CurrentUser?._id}/editprofile`}>
        Edit Profile
      </NavLink>
      <NavLink to={`/user/${CurrentUser?._id}/followers`}>Followers</NavLink>
      <NavLink to={`/user/${CurrentUser?._id}/following`}>Following</NavLink>
      <div className='userPosts'>
        <h4>{CurrentUser?.name}'s Posts</h4>
        {singlePost.map((post, i) => {
          return (
            <div key={i}>
              <Post postItem={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
