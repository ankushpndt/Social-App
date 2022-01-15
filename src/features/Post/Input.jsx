import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentBtn } from './postSlice';
import { AddNotifications } from '../Notification/notificationSlice';
import { Button, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
export default function Input({ postItem, socket }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [commentValue, setCommentValue] = useState('');
  const auth = useSelector((state) => state.auth.login);

  const { token, userId } = auth;

  return (
    <div className='input__comment'>
      {/* <input
        type='text'
        value={commentValue}
        placeholder='Comment here'
        onChange={(e) => {
          setCommentValue(e.target.value);
        }}
      /> */}
      <TextField
        id='filled__comment'
        variant='standard'
        type='text'
        value={commentValue}
        // placeholder='Comment here'
        label='Comment here'
        // style={{ color: 'black', borderBottomColor: 'black' }}
        onChange={(e) => {
          setCommentValue(e.target.value);
        }}
      />
      <Button
        size='small'
        variant='contained'
        id='btn__contained'
        onClick={() => {
          dispatch(
            CommentBtn({
              postId: postItem?._id,
              comment: commentValue,
            })
          );
          setCommentValue('');
          socket?.emit('sendNotification', {
            postId: postItem?._id,
            senderId: userId,
            receiverId: postItem?.userId,
            type: 'COMMENT',
          });
        }}
      >
        {post.status === 'pending' ? 'Commenting...' : 'Comment'}
      </Button>
    </div>
  );
}
