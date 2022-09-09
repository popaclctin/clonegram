import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import {
  useCreatePostLikeMutation,
  useDeleteLikeMutation,
  useGetPostLikesQuery,
} from '../../store/apiSlice';
import './LikeBtn.style.scss';

export default function LikeBtn({ postId }) {
  const auth = useAuth();
  const [createLike] = useCreatePostLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const {
    data: likesData,
    isSuccess,
    isError,
    error,
  } = useGetPostLikesQuery({
    postId,
    userId: auth.user.id,
  });

  let content;

  if (isSuccess) {
    content =
      likesData.totalCount === 1 ? (
        <button
          onClick={() => {
            deleteLike(likesData.likes[0]._id);
          }}
          className='likeBtn likeBtn--red'
        >
          <FontAwesomeIcon icon={faHeartSolid} />
        </button>
      ) : (
        <button
          onClick={() => {
            createLike({ postId });
          }}
          className='likeBtn'
        >
          <FontAwesomeIcon icon={faHeartRegular} />
        </button>
      );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return content;
}
