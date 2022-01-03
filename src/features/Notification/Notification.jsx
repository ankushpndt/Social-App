import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';

export const Notification = ({ socket }) => {
  const check = useSelector((state) => console.log(state));

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket?.on('getNotification', (data) => {
      console.log(data);
      setNotifications([...data]);
    });
  }, [socket]);

  const clearNotifications = ({ id, receiverId }) => {
    socket?.emit('sendClearNotification', {
      id,
      receiverId,
    });
    socket?.on('getClearNotification', (data) => {
      const filteredNoti = notifications.filter(
        (noti) => noti._id !== data._id
      );
      setNotifications(filteredNoti);
    });
  };
  return (
    <div>
      <div>Notifications</div>
      <div className='notifications'>
        {notifications?.map((notification) => {
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
