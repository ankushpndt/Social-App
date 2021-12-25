import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from './authContext';
import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginWithCredentials } from './AuthSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function Login() {
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();
  console.log(state);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  useEffect(() => {
    if (token) {
      if (state?.from) navigate(state?.from);
      else {
        navigate('/home');
      }
    }
  }, [token]);
  function userNameHandler(e) {
    let email = e.target.value;
    setEmail(email);
  }

  const passwordHandler = (e) => {
    let password = e.target.value;
    setPassword(password);
  };
  function submitHandler(e) {
    e.preventDefault();
    dispatch(LoginWithCredentials(email, password));
  }

  return (
    <>
      <h1>This is login page</h1>
      <form
        onSubmit={submitHandler}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          margin: '6rem auto',
          padding: '4rem',
          border: '2px solid #f0f0f0',
        }}
      >
        <label>
          Email:{' '}
          <input
            type='text'
            name='email'
            placeholder='Enter your email here'
            onChange={userNameHandler}
            required
          />
        </label>
        {/* <div className='email__error'>{error && error.email}</div> */}
        <br />
        <br />
        <label>
          Password:{' '}
          <input
            type='password'
            name='password'
            placeholder='Enter your password here'
            onChange={passwordHandler}
          />
        </label>
        {/* <div className='password__error'>{error && error.password}</div> */}
        <br />
        <input type='submit' value='Login' />
        <p>
          <NavLink
            style={{
              textDecoration: 'none',
              color: '#3B82F6',
            }}
            activeStyle={{ fontWeight: 'bold' }}
            to='/signup'
          >
            Create an account
          </NavLink>
        </p>
      </form>
    </>
  );
}
