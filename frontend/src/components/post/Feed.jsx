import React from 'react';
import { useGetFeedQuery } from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';

import PostExcerpt from './PostExcerpt';

function Feed() {
  const { data, isLoading, isSuccess, isError, error } = useGetFeedQuery();

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = data.posts.map((post) => (
      <PostExcerpt key={post._id} post={post} />
    ));
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return (
    <section>
      <h2>Feed</h2>
      {content}
    </section>
  );
}

export default Feed;
