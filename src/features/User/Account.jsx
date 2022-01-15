import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import '../Post/Post.css';
import { useEffect } from 'react';
import { API_URL } from '../../utils/API_URL';
import axios from 'axios';
import { Post } from '../Post/Post';
import { Button } from '@mui/material';
export const Account = () => {
  const [singlePost, setSinglePost] = useState([]);

  const [post, setPost] = useState(0);
  const [followers, setFollowers] = useState(0);
  const [following, setFollowing] = useState(0);
  const user = useSelector((state) => state.user.users.user);
  const auth = useSelector((state) => state.auth.login);

  const CurrentUser = user?.find((user) => user._id === auth.userId);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_URL}/post/${CurrentUser?._id}`);
      setSinglePost(response.data.userPosts);
    })();
  }, []);

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
      <div
        style={{
          display: 'flex',
          gap: '1rem',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <NavLink
          to={`/user/${CurrentUser?._id}/editprofile`}
          style={{
            textDecoration: 'none',
            // color: 'black',
          }}
        >
          <Button size='small' variant='contained' id='btn__contained'>
            Edit Profile
          </Button>
        </NavLink>
        <NavLink
          to={`/user/${CurrentUser?._id}/followers`}
          style={{
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <Button size='small' variant='contained' id='btn__contained'>
            Followers
          </Button>
        </NavLink>
        <NavLink
          to={`/user/${CurrentUser?._id}/following`}
          style={{
            textDecoration: 'none',
            color: 'black',
          }}
        >
          <Button size='small' variant='contained' id='btn__contained'>
            Following
          </Button>
        </NavLink>
      </div>
      <div className='userPosts' style={{ width: '50%', margin: 'auto' }}>
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
