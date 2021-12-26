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

  const CurrentUser = user?.find((user) => user._id === auth.userId);

  return (
    <div>
      <img
        src={CurrentUser?.image}
        width='100px'
        height='100px'
        style={{ borderRadius: '80%' }}
      />
      <p>{CurrentUser?.name}</p>
      <p>{CurrentUser?.email} </p>
      <p>Bio:{CurrentUser?.bio}</p>

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
