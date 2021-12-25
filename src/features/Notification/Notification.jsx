import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { API_URL } from '../../utils/API_URL';
import { useEffect, useState } from 'react';
import { UpdateNotifications } from './notificationSlice';
export const Notification = () => {
  const auth = useSelector((state) => state.auth.login);
  const { token } = auth;
  const notification = useSelector((state) => console.log(state));
  const dispatch = useDispatch();
  const [userNotification, setUserNotification] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await axios.get(`${API_URL}/notification`, {
        headers: { 'auth-token': token },
      });
      console.log(response);
      setUserNotification(response.data.data);
    })();
  }, []);
  // console.log(u)
  return (
    <div>
      <div>Notifications</div>
      <div className='notifications'>
        {userNotification?.map((notification, i) => {
          return (
            <div
              key={i}
              style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}
            >
              <img
                src={notification.source.image}
                width='50px'
                height='50px'
                style={{ borderRadius: '90%' }}
              />
              <p>{notification.source.name}</p>
            </div>
          );
        })}
      </div>
      <div className='clearall'>
        {/* <button onClick={() => dispatch(UpdateNotifications())}>
          Clear All
        </button> */}
      </div>
    </div>
  );
};
