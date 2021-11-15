import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../utils/API_URL';
import { v4 as uuidv4 } from 'uuid';
import { LikeBtn, RemoveBtn, RemoveComment } from './postSlice';
import { useState, useEffect } from 'react';
import Input from './Input';
export const Post = ({ postItem }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [commentData, setCommentData] = useState([]);

  console.log(postItem);

  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${API_URL}/post/${postItem?._id}/comment`
      );
      console.log(response);
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
        <button onClick={() => dispatch(RemoveBtn({ postId: postItem?._id }))}>
          X
        </button>
        <p>{postItem?.description}</p>
        <p>
          <span>
            <button
              onClick={() => dispatch(LikeBtn({ postId: postItem?._id }))}
            >
              {postItem?.likes?.length < 1 ? '' : postItem?.likes?.length} Like
            </button>{' '}
            <button
              onClick={() =>
                postItem?._id === postItem?._id ? setShow((show) => !show) : ''
              }
            >
              Comment
            </button>
            {show ? (
              <div>
                <div className='comment__data'>
                  {commentData.map((item, i) => {
                    return (
                      <div key={i}>
                        <p>{item?.comment}</p>
                        <span>
                          <button
                            onClick={() =>
                              dispatch(
                                RemoveComment({
                                  postId: postItem._id,
                                  commentId: item._id,
                                })
                              )
                            }
                          >
                            X
                          </button>
                        </span>
                      </div>
                    );
                  })}
                </div>

                <Input postItem={postItem} />
              </div>
            ) : (
              ''
            )}
          </span>
        </p>
      </div>
    </div>
  );
};
