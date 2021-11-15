import React, { useEffect } from 'react';
import './App.css';
import { Route, Routes } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Home } from './features/Home/Home';
import { User } from './features/User/User';
import { Followers } from './features/User/Followers';
import { Following } from './features/User/Following';
import { LoadPosts } from './features/Post/postSlice';
import { useDispatch } from 'react-redux';
// import Login from './features/Auth/Login';
// import SignUp from './features/Auth/SignUp';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadPosts());
  }, []);
  return (
    <div className='App'>
      <NavLink to='/user'>User</NavLink>
      <NavLink to='/home'>Home</NavLink>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        {/* <Route path='/signup' element={<SignUp />} /> */}
        <Route path='/home' element={<Home />} />
        <Route path='/:username/followers' element={<Followers />} />
        <Route path='/:username/following' element={<Following />} />
        <Route path='/user' element={<User />} />
      </Routes>
    </div>
  );
}

export default App;
