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

  const [followUser, { isLoading: isLoadingFollow }] =
    useCreateFollowMutation();
  const [unfollowUser, { isLoading: isLoadingUnfollow }] =
    useDeleteFollowMutation();

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
        {isLoadingUnfollow ? (
          <LoadingSpinner />
        ) : (
          <FontAwesomeIcon icon={faUserCheck} />
        )}
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
          {isLoadingFollow ? <LoadingSpinner /> : 'Follow'}
        </button>
      ) : (
        <p>{JSON.stringify(error)}</p>
      );
  }

  return <div className='followBtn'>{content}</div>;
}

export default FollowBtn;
