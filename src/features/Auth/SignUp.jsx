import { useNavigate } from 'react-router-dom';
import { SignUpWithCredentials } from './AuthSlice';
import React, { useState } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
export default function SignUp() {
  // const { state } = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const validateForm = () => {
    if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
      setErrorMessage('Invalid Name. Must be at least 3 characters long.');
      return false;
    }
    if (!/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/i.test(email)) {
      setErrorMessage('Invalid Email');
      return false;
    }
    if (!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i.test(password)) {
      setErrorMessage(
        'Invalid Password. Must be atleast 8 characters long and contain 1 uppercase, lowercase letter and number.'
      );
      return false;
    }
    setErrorMessage('');
    return true;
  };
  function nameHandler(e) {
    let name = e.target.value;
    setName(name);
  }
  function emailHandler(e) {
    let email = e.target.value;
    setEmail(email);
  }

  const passwordHandler = (e) => {
    let password = e.target.value;
    setPassword(password);
  };
  const signUpHandler = (e) => {
    // validateForm() &&
    dispatch(SignUpWithCredentials({ name, email, password }));
  };

  return (
    <>
      <h1> This is signup page </h1>
      <form
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
        <label htmlFor=''>Name:</label>
        <input
          type='text'
          name='fullName'
          placeholder='Enter your name here'
          onChange={nameHandler}
          required
        />
        <label>
          Email:{' '}
          <input
            type='text'
            name='email'
            placeholder='Enter your email here'
            onChange={emailHandler}
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
            required
          />
        </label>
        {/* <div className='password__error'>{error && error.password}</div> */}
        <br />
        <button
          onClick={(e) => {
            e.preventDefault();
            signUpHandler();
          }}
        >
          SignUp
        </button>
        <p>
          <NavLink
            style={{
              textDecoration: 'none',
              color: '#3B82F6',
            }}
            activeStyle={{ fontWeight: 'bold' }}
            to='/'
          >
            Login instead
          </NavLink>
        </p>
      </form>
    </>
  );
}
