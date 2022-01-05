import React, { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Home } from './features/Home/Home';
import { User } from './features/User/User';
import { EditProfile } from './features/User/EditProfile';
import { Followers } from './features/User/Followers';
import { Following } from './features/User/Following';
import { LoadPosts } from './features/Post/postSlice';
import { LoadUsers } from './features/User/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Login from './features/Auth/Login';
import SignUp from './features/Auth/SignUp';
import { PrivateRoute } from './PrivateRoute';
import { logoutBtnPressed } from './features/Auth/AuthSlice';
import { Notification } from './features/Notification/Notification';
import { Account } from './features/User/Account';
import { io } from 'socket.io-client';
import NotificationIcon from './assets/notification.svg';
import HomeIcon from './assets/home.svg';
import Settings from './assets/settings.svg';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth.login);
  const [socket] = useState(() =>
    io('https://socialMediaBackend.ankushpndt.repl.co')
  );
  const [open, setOpen] = useState(false);
  const { userId, user, token } = auth;
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  // let socket = io.connect('https://socialMediaBackend.ankushpndt.repl.co');
  useEffect(() => {
    if (token) {
      dispatch(LoadPosts({ userId }));
      dispatch(LoadUsers());
    }
  }, [auth, token]);

  useEffect(() => {
    socket?.emit('addUser', userId);
  }, [socket, userId]);
  const logoutHandler = () => {
    dispatch(logoutBtnPressed());
    navigate('/');
  };
  return (
    <div className='App'>
      <div className='navbar'>
        <span className='logo'>Social App</span>
        <div className='icons'>
          <div className='icon' onClick={() => setOpen(!open)}>
            {/* <NavLink
              style={{ color: 'white', textDecoration: 'none' }}
              to='/notifications'
            > */}
            <img src={NotificationIcon} className='icon__img' alt='' />
            {notifications.length > 0 && (
              <div className='counter'>{notifications.length}</div>
            )}
            {/* </NavLink> */}
          </div>
          <div className='icon' onClick={() => setOpen(!open)}>
            <NavLink to='/home'>
              {' '}
              <img src={HomeIcon} className='icon__img' alt='' />
            </NavLink>
          </div>
          <div className='icon' onClick={() => setOpen(!open)}>
            <NavLink to='user'>
              <img src={Settings} className='icon__img' alt='' />
            </NavLink>
          </div>
        </div>
      </div>
      <Notification socket={socket} open={open} setOpen={setOpen} />
      <button onClick={logoutHandler}>Logout</button>
      <Routes>
        <Route path='/' element={<Login socket={socket} />} />
        <Route path='/signup' element={<SignUp />} />
        <PrivateRoute path='/home' element={<Home socket={socket} />} />
        <PrivateRoute
          path='/notifications'
          element={
            <Notification socket={socket} open={open} setOpen={setOpen} />
          }
        />
        <Route path='/user/:userId/editprofile' element={<EditProfile />} />
        <Route path='/user/:userId/followers' element={<Followers />} />
        <Route path='/user/:userId/following' element={<Following />} />
        <PrivateRoute path='/user' element={<Account socket={socket} />} />
        <PrivateRoute path='/user/:userId' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
