import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentBtn } from './postSlice';
import { AddNotifications } from '../Notification/notificationSlice';
export default function Input({ postItem }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [commentValue, setCommentValue] = useState('');
  const user = useSelector((state) => state.auth.login);

  const { token } = user;
  return (
    <div className='input__comment'>
      <input
        type='text'
        value={commentValue}
        placeholder='Comment here'
        onChange={(e) => {
          setCommentValue(e.target.value);
        }}
      />

      <button
        onClick={() => {
          dispatch(
            CommentBtn({
              postId: postItem?._id,
              comment: commentValue,
            })
          );
          setCommentValue('');
          dispatch(
            AddNotifications({
              postId: postItem?._id,
              target: postItem?.userId,
              notificationType: 'COMMENT',
              token,
            })
          );
        }}
      >
        {post.status === 'pending' ? 'Commenting...' : 'Comment'}
      </button>
    </div>
  );
}
