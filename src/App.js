import React, { useEffect } from 'react';
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

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.login);
  const { userId, user, token } = currentUser;
  const a = useSelector((state) => console.log(state));

  useEffect(() => {
    dispatch(LoadPosts({ userId }));
    dispatch(LoadUsers());
  }, [currentUser]);
  const logoutHandler = () => {
    // localStorage.clear();
    dispatch(logoutBtnPressed());
    // navigate('/');
  };
  return (
    <div className='App'>
      <NavLink to={`/user/${userId}`}>User</NavLink>
      <NavLink to='/home'>Home</NavLink>
      <NavLink to='/notifications'>Notification</NavLink>
      <button onClick={logoutHandler}>Logout</button>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <PrivateRoute path='/home' element={<Home />} />
        <Route path='/notifications' element={<Notification />} />
        <Route path='/:userId/editprofile' element={<EditProfile />} />
        <Route path='/:userId/followers' element={<Followers />} />
        <Route path='/:userId/following' element={<Following />} />
        <PrivateRoute path={`/user/:userId`} element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
