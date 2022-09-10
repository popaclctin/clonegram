import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import React from 'react';
import useAuth from '../../hooks/useAuth';
import {
  useCreateLikeMutation,
  useDeleteLikeMutation,
  useGetLikeQuery,
} from '../../store/apiSlice';
import './LikeBtn.style.scss';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function LikeBtn({ postId }) {
  const auth = useAuth();
  const [createLike] = useCreateLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const { data, isLoading, isSuccess, isError, error } = useGetLikeQuery({
    postId,
    userId: auth.user.id,
  });

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <button
        onClick={() => {
          deleteLike(data.like._id);
        }}
        className='likeBtn likeBtn--red'
      >
        <FontAwesomeIcon icon={faHeartSolid} />
      </button>
    );
  } else if (isError) {
    content =
      error.status === 404 ? (
        <button
          onClick={() => {
            createLike({ postId });
          }}
          className='likeBtn'
        >
          <FontAwesomeIcon icon={faHeartRegular} />
        </button>
      ) : (
        <p>{JSON.stringify(error)}</p>
      );
  }
  return content;
}
