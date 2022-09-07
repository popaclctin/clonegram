import React from 'react';
import { useGetFeedQuery } from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';

import PostsList from './PostsList';

function Feed() {
  const { data, isLoading, isSuccess, isError, error } = useGetFeedQuery();

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = <PostsList posts={data.posts} />;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <section>{content}</section>;
}

export default Feed;
