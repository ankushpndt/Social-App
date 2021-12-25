import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router';
export const UserCard = ({ userId }) => {
  const user = useSelector((state) => state.user.users.user).find(
    (el) => el._id === userId
  );
  console.log(user);
  const navigate = useNavigate();
  return (
    <div>
      <div
        className='user__profile'
        onClick={() => navigate(`/user/${user._id}`)}
        style={{ cursor: 'pointer', border: '1px solid red' }}
      >
        <p>{user.name}</p>
        <p>@{user.name}</p>
      </div>
    </div>
  );
};
