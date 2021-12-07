import { UserDetails } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useState } from 'react';
import axios from 'axios';
export const EditProfile = () => {
  const [imgUrl, setUrl] = useState('');
  const [username, setName] = useState('');
  const [bio, setBio] = useState('');
  const dispatch = useDispatch();
  // const { userId } = useParams();
  // const user = useSelector((state) => state.user.users.user)?.find(
  //   (user) => user.name === name
  // );
  const { token } = useSelector((state) => state.auth.login);

  const userHandler = async () => {
    await dispatch(UserDetails({ username, bio, imgUrl, token }));
    setName('');
    setBio('');
  };
  // upload image
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'e2pkko9m');
    // data.append('cloud_name', 'dzvkso0q0');
    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dzvkso0q0/image/upload',
        data
      );

      setUrl(response.data.url);

      // console.log(response);
    } catch (err) {
      console.log(err.response);
    }
  };
  return (
    <div>
      edit Profile
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
      <button className='btn__post' onClick={userHandler}>
        {/* {user.status === 'fulfilled' ? 'Post' : 'Posting...'} */}
        Post
      </button>
      <label htmlFor=''>
        Name:
        <input
          type='text'
          onChange={(e) => setName(e.target.value)}
          value={username}
        />
      </label>
      <label htmlFor=''>
        Bio
        <input
          type='text'
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </label>
    </div>
  );
};
