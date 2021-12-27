import { useLocation, useNavigate } from 'react-router-dom';
// import { useAuth } from './authContext';
import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { LoginWithCredentials } from './AuthSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import '../../style.css';
export default function Login() {
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

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
  const userNameHandler = (e) => {
    let email = e.target.value;
    setEmail(email);
  };

  const passwordHandler = (e) => {
    let password = e.target.value;
    setPassword(password);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(LoginWithCredentials(email, password));
  };

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
        <TextField
          id='standard__basic'
          label='Email'
          variant='standard'
          type='text'
          name='email'
          helperText='Enter your email here'
          onChange={userNameHandler}
          required
        />

        {/* <div className='email__error'>{error && error.email}</div> */}
        <br />
        <br />

        <TextField
          id='standard__basic'
          label='Password'
          variant='standard'
          type='password'
          name='password'
          helperText='Enter your password here'
          onChange={passwordHandler}
          required
        />

        {/* <div className='password__error'>{error && error.password}</div> */}
        <br />
        {/*Login button*/}
        <input type='submit' value='LOGIN' id='login__btn__outlined' />

        <p>
          <NavLink
            style={{
              textDecoration: 'none',
              color: 'black',
              fontWeight: '400',
            }}
            activeStyle={{ fontWeight: 'bold', color: 'white' }}
            to='/signup'
          >
            Create an account
          </NavLink>
        </p>
      </form>
    </>
  );
}
