// import { useNavigate } from 'react-router-dom';
// // import { useAuth } from './authContext';
// import React, { useState } from 'react';
// import { Routes, Route, NavLink } from 'react-router-dom';
// export default function SignUp() {
//   // const { state } = useLocation();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [name, setName] = useState('');
//   // const { signUpWithCredentials, error } = useAuth();
//   function nameHandler(e) {
//     let name = e.target.value;
//     setName(name);
//   }
//   function emailHandler(e) {
//     let email = e.target.value;
//     setEmail(email);
//   }

//   const passwordHandler = (e) => {
//     let password = e.target.value;
//     setPassword(password);
//   };
//   async function submitHandler(e) {
//     e.preventDefault();

//     signUpWithCredentials(name, email, password);
//     // setTimeout(() => navigate('/cart'), 3000);
//   }

//   return (
//     <>
//       <h1> This is signup page </h1>
//       <form
//         onSubmit={submitHandler}
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           flexDirection: 'column',
//           margin: '6rem auto',
//           padding: '4rem',
//           border: '2px solid #f0f0f0',
//         }}
//       >
//         <label htmlFor=''>Name:</label>
//         <input
//           type='text'
//           name='fullName'
//           placeholder='Enter your name here'
//           onChange={nameHandler}
//           required
//         />
//         <label>
//           Email:{' '}
//           <input
//             type='text'
//             name='email'
//             placeholder='Enter your email here'
//             onChange={emailHandler}
//             required
//           />
//         </label>
//         <div className='email__error'>{error && error.email}</div>
//         <br />
//         <br />
//         <label>
//           Password:{' '}
//           <input
//             type='password'
//             name='password'
//             placeholder='Enter your password here'
//             onChange={passwordHandler}
//             required
//           />
//         </label>
//         <div className='password__error'>{error && error.password}</div>
//         <br />
//         <input type='submit' value='Sign Up' />
//         <p>
//           <NavLink
//             style={{
//               textDecoration: 'none',
//               color: '#3B82F6',
//             }}
//             activeStyle={{ fontWeight: 'bold' }}
//             to='/login'
//           >
//             Login instead
//           </NavLink>
//         </p>
//       </form>
//     </>
//   );
// }
