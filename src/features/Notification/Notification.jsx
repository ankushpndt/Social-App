import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { clearSocketData, socketsData } from './notificationSlice';
import DeleteIcon from '@mui/icons-material/Delete';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import '../../App.css';
export const Notification = ({ socket, open, anchorEl, handleClose }) => {
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  useSelector((state) => console.log(state));

  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('getNotification', (data) => {
      dispatch(socketsData(data));
    });
  }, [socket]);

  const clearNotifications = ({ id, receiverId }) => {
    socket?.emit('sendClearNotification', {
      id,
      receiverId,
    });
    socket?.on('getClearNotification', (data) => {
      dispatch(clearSocketData(data));
    });
  };

  return (
    <div>
      <div className='notifications'>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          {notifications?.map((notification) => {
            return (
              <div key={uuidv4()}>
                <div className='display__noti'>
                  <p
                    style={{
                      display: 'flex',
                    }}
                  >
                    {notification?.notificationType === 'COMMENT' ? (
                      <MenuItem>
                        <span className='notification'>
                          {' '}
                          <img
                            src={notification?.source?.image}
                            width='30px'
                            height='30px'
                            style={{ borderRadius: '90%' }}
                          />
                          {notification?.source?.name} commented on your post{' '}
                        </span>
                      </MenuItem>
                    ) : notification?.notificationType === 'LIKE' ? (
                      <MenuItem>
                        <span className='notification'>
                          {' '}
                          <img
                            src={notification?.source?.image}
                            width='30px'
                            height='30px'
                            style={{ borderRadius: '90%' }}
                          />
                          {notification?.source?.name} liked your post
                        </span>
                      </MenuItem>
                    ) : notification?.notificationType === 'FOLLOW' ? (
                      <MenuItem>
                        <span className='notification'>
                          {' '}
                          <img
                            src={notification?.source?.image}
                            width='30px'
                            height='30px'
                            style={{ borderRadius: '90%' }}
                          />
                          {notification?.source?.name} followed you
                        </span>
                      </MenuItem>
                    ) : (
                      'There are no notifications.'
                    )}
                    {/* <MenuItem></MenuItem> */}
                    <button
                      className='n__button'
                      onClick={() =>
                        clearNotifications({
                          id: notification?._id,
                          receiverId: notification?.target,
                        })
                      }
                    >
                      <DeleteIcon />
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
        </Menu>
      </div>
    </div>
  );
};
