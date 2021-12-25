import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { API_URL } from '../../utils/API_URL';
import { v4 as uuidv4 } from 'uuid';
import { LikeBtn, RemoveBtn, RemoveComment } from './postSlice';
import { useState, useEffect } from 'react';
import Input from './Input';
import { AddNotifications } from '../Notification/notificationSlice';
export const Post = ({ postItem }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [commentData, setCommentData] = useState([]);
  const user = useSelector((state) => state.auth.login);
  const { userId, token } = user;
  const isPostLiked = postItem.likes.length;
  console.log(isPostLiked);
  console.log(postItem);
  const findUser = postItem.likes.find((likesId) => likesId === userId);
  console.log(findUser);
  useEffect(() => {
    (async () => {
      const response = await axios.get(
        `${API_URL}/post/${postItem?._id}/comment`
      );

      setCommentData(response.data.comments);
    })();
  }, [postItem]);
  // console.log(postItem.likes);
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
        <button
          onClick={() => dispatch(RemoveBtn({ postId: postItem?._id, userId }))}
        >
          X
        </button>
        <div>{postItem?.description}</div>
        <div>
          <span>
            <button
              // onClick={() => {
              //   dispatch(
              //     LikeBtn({ postId: postItem?._id, userId: user?.userId })
              //   );
              // }}
              onClick={() => {
                if (findUser) {
                  dispatch(
                    LikeBtn({ postId: postItem?._id, userId: user?.userId })
                  );
                } else {
                  dispatch(
                    LikeBtn({ postId: postItem?._id, userId: user?.userId })
                  );

                  dispatch(
                    AddNotifications({
                      postId: postItem?._id,
                      target: postItem?.userId,
                      notificationType: 'LIKE',
                      token,
                    })
                  );
                }
              }}
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
        </div>
      </div>
    </div>
  );
};
