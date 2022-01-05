import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { clearSocketData, socketsData } from './notificationSlice';
import '../../App.css';
export const Notification = ({ socket, open }) => {
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  useSelector((state) => console.log(state));

  const dispatch = useDispatch();
  useEffect(() => {
    socket.on('getNotification', (data) => {
      console.log(data);
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
  console.log('notifications => ', notifications);

  return (
    <div>
      <div>Notifications</div>
      <div className='notifications'>
        {open &&
          notifications?.map((notification) => {
            return (
              <div key={uuidv4()}>
                <div className='displayNoti'>
                  <p>
                    {notification?.notificationType === 'COMMENT' ? (
                      <>
                        <span>
                          {' '}
                          <img
                            src={notification?.source?.image}
                            width='50px'
                            height='50px'
                            style={{ borderRadius: '90%' }}
                          />
                          {notification?.source?.name} commented on your post{' '}
                        </span>
                      </>
                    ) : notification?.notificationType === 'LIKE' ? (
                      <span>
                        {' '}
                        <img
                          src={notification?.source?.image}
                          width='50px'
                          height='50px'
                          style={{ borderRadius: '90%' }}
                        />
                        {notification?.source?.name} liked your post
                      </span>
                    ) : notification?.notificationType === 'FOLLOW' ? (
                      <span>
                        {' '}
                        <img
                          src={notification?.source?.image}
                          width='50px'
                          height='50px'
                          style={{ borderRadius: '90%' }}
                        />
                        {notification?.source?.name} followed you
                      </span>
                    ) : (
                      ''
                    )}
                    <button
                      className='nButton'
                      onClick={() =>
                        clearNotifications({
                          id: notification?._id,
                          receiverId: notification?.target,
                        })
                      }
                    >
                      X
                    </button>
                  </p>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
