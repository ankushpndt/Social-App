import axios from 'axios';
import './Post.css';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../utils/API_URL';
import { v4 as uuidv4 } from 'uuid';
import { LikeBtn, RemoveBtn, RemoveComment } from './postSlice';
import { useState, useEffect } from 'react';
import Input from './Input';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export const Post = ({ postItem, socket }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [commentData, setCommentData] = useState([]);
  const user = useSelector((state) => state.auth.login);

  const { userId, token } = user;

  const findUser = postItem.likes.find((likesId) => likesId === userId);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${API_URL}/post/${postItem?._id}/comment`
      );

      setCommentData(response.data.comments);
    })();
  }, [postItem]);

  return (
    <div>
      <div
        key={uuidv4()}
        style={{ border: '1px solid black', margin: '0.5rem' }}
      >
        {postItem?.media ? (
          <div>
            <img
              src={postItem?.media}
              alt='image'
              width='300px'
              height='250px'
            />
          </div>
        ) : (
          ''
        )}
        <Button
          size='small'
          variant='contained'
          startIcon={<DeleteIcon />}
          id='btn__contained'
          onClick={() => dispatch(RemoveBtn({ postId: postItem?._id, userId }))}
        >
          Delete
        </Button>
        <div>{postItem?.description}</div>
        <div>
          <span>
            <Button
              size='small'
              variant='contained'
              id='btn__contained'
              onClick={() => {
                if (findUser) {
                  dispatch(
                    LikeBtn({ postId: postItem?._id, userId: user?.userId })
                  );
                } else {
                  dispatch(
                    LikeBtn({ postId: postItem?._id, userId: user?.userId })
                  );

                  socket?.emit('sendNotification', {
                    postId: postItem?._id,
                    senderId: userId,
                    receiverId: postItem?.userId,
                    type: 'LIKE',
                  });
                }
              }}
            >
              {postItem?.likes?.length < 1 ? '' : postItem?.likes?.length} Like
            </Button>{' '}
            <Button
              size='small'
              variant='outlined'
              id='btn__outlined'
              onClick={() =>
                postItem?._id === postItem?._id ? setShow((show) => !show) : ''
              }
            >
              Comment
            </Button>
            {show ? (
              <div>
                <div id='comment__data'>
                  {commentData.map((item, i) => {
                    return (
                      <div key={i}>
                        <p>{item?.comment}</p>
                        <span>
                          <Button
                            size='small'
                            variant='contained'
                            id='btn__contained'
                            startIcon={<DeleteIcon />}
                            onClick={() =>
                              dispatch(
                                RemoveComment({
                                  postId: postItem._id,
                                  commentId: item._id,
                                })
                              )
                            }
                          >
                            Delete
                          </Button>
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Input postItem={postItem} socket={socket} />
              </div>
            ) : (
              ''
            )}
          </span>
        </div>
      </div>
    </div>
  );
};
