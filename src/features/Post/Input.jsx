import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CommentBtn } from './postSlice';
export default function Input({ postItem }) {
  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const [commentValue, setCommentValue] = useState('');
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
        }}
      >
        {post.status === 'pending' ? 'Commenting...' : 'Comment'}
      </button>
    </div>
  );
}
