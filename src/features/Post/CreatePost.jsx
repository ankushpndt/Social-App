import './Post.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostBtn } from './postSlice';
import axios from 'axios';
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
export const CreatePost = () => {
  const [postData, setpostData] = useState('');
  const [status, setStatus] = useState(false);
  const [imgUrl, setUrl] = useState('');
  const { userId } = useSelector((state) => state.auth.login);
  const dispatch = useDispatch();
  const postHandler = async () => {
    setStatus(true);
    dispatch(PostBtn({ postData, imgUrl, userId, setStatus }));
    setpostData('');
  };
  // upload image
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'e2pkko9m');
    data.append('cloud_name', 'dzvkso0q0');
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzvkso0q0/image/upload',
        data
      );

      setUrl(response.data.url);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className='create__post'
      style={{
        border: '1px solid black',
        width: '650px',
        margin: 'auto',
        padding: '1rem',
      }}
    >
      <div>Create Post</div>
      <textarea
        name=''
        id=''
        cols='40'
        rows='2'
        placeholder="What's happening?"
        onChange={(e) => {
          setpostData(e.target.value);
        }}
        value={postData}
      />
      {/* show uploaded img here*/}
      {imgUrl ? (
        <div className='createpost-uploaded-img-div'>
          <img className='createpost-img-show' src={imgUrl} width='300px' />
        </div>
      ) : (
        <div> </div>
      )}

      <label htmlFor='upload__btn'>
        <input type='file' id='upload__btn' hidden onChange={uploadImage} />
        <IconButton
          color='primary'
          aria-label='upload picture'
          component='span'
          id='btn__outlined'
        >
          <PhotoCamera />
        </IconButton>
      </label>
      <span style={{ cursor: 'not-allowed' }}>
        <Button
          variant='outlined'
          id='btn__outlined'
          disabled={!postData}
          onClick={postHandler}
          style={{ marginLeft: '0.2rem' }}
        >
          {status ? 'Posting...' : 'Post'}
          {/* Post */}
        </Button>
      </span>
    </div>
  );
};
