import React, { Fragment } from 'react';
import './Profile.style.scss';
import { useGetUserPostsQuery } from '../../store/apiSlice';

import LoadingSpinner from '../ui/LoadingSpinner';
import UserInfo from './UserInfo';

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
      </Fragment>
    );
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <section className='profile'>{content}</section>;
}

export default Profile;
