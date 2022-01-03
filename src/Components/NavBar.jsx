// import { useEffect, useState } from 'react';
// import Notification from '../assets/notification.svg';
// import Message from '../assets/message.svg';
// import Settings from '../assets/settings.svg';
// import './NavBar.css';
// // import { Socket } from 'socket.io-client';
// export const NavBar = ({ socket }) => {
//   const [open, setOpen] = useState(false);
//   const [noti, setNoti] = useState([]);
//   useEffect(() => {
//     socket?.on('getNotification', (payload) => {
//       setNoti((prev) => [prev, ...payload]);
//     });
//   }, [socket]);
//   console.log(noti);
//   return (
//     <div className='navbar'>
//       <span className='logo'>Social App</span>
//       <div className='icons'>
//         <div className='icon' onClick={() => setOpen(!open)}>
//           <img src={Notification} className='icon__img' alt='' />
//           {/* {notifications.length > 0 && (
//             <div className='counter'>{notifications.length}</div>
//           )} */}
//         </div>
//         <div className='icon' onClick={() => setOpen(!open)}>
//           <img src={Message} className='icon__img' alt='' />
//         </div>
//         <div className='icon' onClick={() => setOpen(!open)}>
//           <img src={Settings} className='icon__img' alt='' />
//         </div>
//       </div>
//       {/* {open && (
//         <div className="notifications">
//           {notifications.map((n) => displayNotification(n))}
//           <button className="nButton" onClick={handleRead}>
//             Mark as read
//           </button>
//         </div>
//       )} */}
//     </div>
//   );
// };
