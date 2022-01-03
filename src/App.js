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
// import { NavBar } from './Components/NavBar';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login);

  const { userId, user, token } = currentUser;

  let socket = io.connect('https://socialMediaBackend.ankushpndt.repl.co');
  useEffect(() => {
    if (token) {
      dispatch(LoadPosts({ userId }));
      dispatch(LoadUsers());
    }
  }, [currentUser, token]);

  useEffect(() => {
    socket.emit('addUser', userId);
  }, [socket, userId]);
  const logoutHandler = () => {
    dispatch(logoutBtnPressed());
    navigate('/');
  };
  return (
    <div className='App'>
      {/* <NavBar /> */}
      <NavLink to='user'>User</NavLink>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/notifications'>Notification</NavLink>
      <button onClick={logoutHandler}>Logout</button>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <PrivateRoute path='/home' element={<Home socket={socket} />} />
        <PrivateRoute
          path='/notifications'
          element={<Notification socket={socket} />}
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
