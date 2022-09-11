import React, { Fragment } from 'react';
import './Profile.style.scss';
import { useGetUserPostsQuery } from '../../store/apiSlice';

import LoadingSpinner from '../ui/LoadingSpinner';
import UserInfo from './UserInfo';
import PostsGrid from '../post/PostsGrid';

function Profile({ user }) {
  const { data, isLoading, isSuccess, isError, error } = useGetUserPostsQuery(
    user._id
  );

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <Fragment>
        <UserInfo user={user} />
        <PostsGrid posts={data.posts} />
      </Fragment>
    );
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <section className='profile'>{content}</section>;
}

export default Profile;
