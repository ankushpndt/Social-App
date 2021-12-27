import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { GetNotifications, UpdateNotifications } from './notificationSlice';
export const Notification = () => {
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  const notification = useSelector((state) => state.notification.notifications);

  const check = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      dispatch(GetNotifications({ token }));
    })();
  }, []);
  return (
    <div>
      <div>Notifications</div>
      <div className='notifications'>
        {notification
          ?.filter((noti) => noti.read === false)
          .map((notification, i) => {
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '1rem',
                }}
              >
                {/* {notification.read === false ? ( */}
                <>
                  <img
                    src={notification.source.image}
                    width='50px'
                    height='50px'
                    style={{ borderRadius: '90%' }}
                  />
                  <p>{notification.source.name}</p>
                  <p>
                    {notification.notificationType === 'COMMENT' ? (
                      <span>commented on your post</span>
                    ) : notification.notificationType === 'LIKE' ? (
                      <span>liked your post</span>
                    ) : notification.notificationType === 'FOLLOW' ? (
                      <span>followed you</span>
                    ) : (
                      ''
                    )}
                  </p>
                  <div className='clearall'>
                    <button
                      onClick={() =>
                        dispatch(
                          UpdateNotifications({
                            notificationId: notification._id,
                            token,
                          })
                        )
                      }
                    >
                      Clear
                    </button>
                  </div>
                </>
                {/* ) : (
                ''
              )} */}
              </div>
            );
          })}
      </div>
    </div>
  );
};
