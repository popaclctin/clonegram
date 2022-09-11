import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import FollowBtn from '../post/FollowBtn';
import './UserInfo.style.scss';
import {
  useGetFollowersQuery,
  useGetFollowingQuery,
  useGetUserPostsQuery,
} from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';

function UserInfo({ user }) {
  const {
    data: postsData,
    isLoading: isLoadingPosts,
    isSuccess: isSuccessPosts,
    isError: isErrorPosts,
    error: errorPosts,
  } = useGetUserPostsQuery(user._id);
  const {
    data: followersData,
    isLoading: isLoadingFollowers,
    isSuccess: isSuccessFollowers,
    isError: isErrorFollowers,
    error: errorFollowers,
  } = useGetFollowersQuery(user._id);
  const {
    data: followingData,
    isLoading: isLoadingFollowing,
    isSuccess: isSuccessFollowing,
    isError: isErrorFollowing,
    error: errorFollowing,
  } = useGetFollowingQuery(user._id);

  let followersContent, followingContent, postsContent;

  if (isLoadingFollowers) {
    followersContent = <LoadingSpinner />;
  } else if (isSuccessFollowers) {
    followersContent = followersData.totalCount;
  } else if (isErrorFollowers) {
    followersContent = <p>{JSON.stringify(errorFollowers)}</p>;
  }

  if (isLoadingFollowing) {
    followingContent = <LoadingSpinner />;
  } else if (isSuccessFollowing) {
    followingContent = followingData.totalCount;
  } else if (isErrorFollowing) {
    followingContent = <p>{JSON.stringify(errorFollowing)}</p>;
  }

  if (isLoadingPosts) {
    postsContent = <LoadingSpinner />;
  } else if (isSuccessPosts) {
    postsContent = postsData.totalCount;
  } else if (isErrorPosts) {
    postsContent = <p>{JSON.stringify(errorPosts)}</p>;
  }

  return (
    <div className='userInfo'>
      <div className='userInfo__profilePic'>
        <FontAwesomeIcon icon={faCircleUser} />
      </div>
      <div className='userInfo__body'>
        <div className='userInfo__header'>
          <p className='userInfo__username'>{user.username}</p>
          <div className='userInfo__menu'>
            <FollowBtn userId={user._id} />
          </div>
          <button className='userInfo__optionsBtn'>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
        <div className='userInfo__info'>
          <p className='userInfo__postsNo'>
            <span className='userInfo__info__no'>{postsContent}</span>posts
          </p>
          <p className='userInfo__followersNo'>
            <span className='userInfo__info__no'>{followersContent}</span>
            followers
          </p>
          <p className='userInfo__followingNo'>
            <span className='userInfo__info__no'>{followingContent}</span>
            following
          </p>
        </div>
        <div className='userInfo__description'>
          <p className='userInfo__fullName'>{user.fullName}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
