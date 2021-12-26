import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentBtn } from './postSlice';
import { AddNotifications } from '../Notification/notificationSlice';
import { Button, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
export default function Input({ postItem }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [commentValue, setCommentValue] = useState('');
  const user = useSelector((state) => state.auth.login);

  const { token } = user;
  const CssTextField = styled(TextField)({
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'black',
      },
      '&:hover fieldset': {
        borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'black',
      },
    },
  });
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
      <CssTextField
        id='filled-comment'
        variant='standard'
        type='text'
        value={commentValue}
        // placeholder='Comment here'
        label='Comment here'
        style={{ color: 'black', borderBottomColor: 'black' }}
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
      </Button>
    </div>
  );
}
