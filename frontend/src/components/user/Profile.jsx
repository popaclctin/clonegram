import React, { useEffect } from 'react';

import { useGetUserPostsQuery } from '../../store/apiSlice';

import LoadingSpinner from '../ui/LoadingSpinner';

function Profile({ user }) {
  const { data, isLoading, isSuccess, isError, error } = useGetUserPostsQuery(
    user._id
  );

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = null;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return (
    <section>
      <h1>Profile</h1>
      {content}
    </section>
  );
}

export default Profile;
