import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { API_URL } from '../../utils/API_URL';
import { Post } from '../Post/Post';
export const User = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  console.log(userId);
  const user = useSelector((state) => state.user.users.user);
  console.log(user);
  const CurrentUser = user?.find((user) => user._id === userId);
  console.log(CurrentUser);

  const [specificUserPost, setSpecificUserPost] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_URL}/post/${userId}`);
      setSpecificUserPost(response.data.userPosts);
    })();
  }, []);
  console.log(specificUserPost);
  return (
    <div>
      <img src={CurrentUser?.image} width='300px' />
      <p>{CurrentUser?.name}</p>
      <p>{CurrentUser?.email} </p>
      <p>Bio:{CurrentUser?.bio}</p>
      {/* <NavLink to={`/user/${CurrentUser?._id}/post`}>Posts</NavLink>   */}
      <NavLink to={`/user/${CurrentUser?._id}/editprofile`}>
        Edit Profile
      </NavLink>
      <NavLink to={`/user/${CurrentUser?._id}/followers`}>Followers</NavLink>
      <NavLink to={`/user/${CurrentUser?._id}/following`}>Following</NavLink>
      <div className='userPosts'>
        <h4>{CurrentUser?.name}'s Posts</h4>
        {specificUserPost.map((post, i) => {
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
