import React from 'react';
import './FollowBtn.style.scss';
import useAuth from '../../hooks/useAuth';
import {
  useCreateFollowMutation,
  useDeleteFollowMutation,
  useGetFollowQuery,
} from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';

function FollowBtn({ userId }) {
  const auth = useAuth();

  const { data, isLoading, isSuccess, isError, error } = useGetFollowQuery({
    userId: auth.user.id,
    followeeId: userId,
  });

  const [followUser] = useCreateFollowMutation();
  const [unfollowUser] = useDeleteFollowMutation();

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <button
        className='followBtn__isFollowing'
        onClick={() => {
          unfollowUser(data.follow._id);
        }}
      >
        <FontAwesomeIcon icon={faUserCheck} />
      </button>
    );
  } else if (isError) {
    content =
      error.status === 404 ? (
        <button
          className='followBtn__notFollowing'
          onClick={() => {
            followUser({ userId });
          }}
        >
          Follow
        </button>
      ) : (
        <p>{JSON.stringify(error)}</p>
      );
  }

  return <div className='followBtn'>{content}</div>;
}

export default FollowBtn;
