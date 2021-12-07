import './Post.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostBtn } from './postSlice';
import axios from 'axios';
export const CreatePost = () => {
  const [postData, setpostData] = useState('');

  const [imgUrl, setUrl] = useState('');
  const { userId } = useSelector((state) => state.auth.login);

  const dispatch = useDispatch();
  const post = useSelector((state) => state.post);
  const postHandler = async () => {
    console.log(userId);
    await dispatch(PostBtn({ postData, imgUrl, userId }));
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

      // console.log(response);
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
        Upload
        <input
          type='file'
          id='upload__btn'
          hidden
          // onChange={(e) => setImage(e.target.files[0])}
          onChange={uploadImage}
        />
      </label>
      <button className='btn__post' disabled={!postData} onClick={postHandler}>
        {/* {post.status === 'fulfilled' ? 'Post' : 'Posting...'} */}
        Post
      </button>
    </div>
  );
};
