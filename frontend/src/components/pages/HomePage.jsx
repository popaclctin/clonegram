import React from 'react';
import { useGetFeedQuery } from '../../store/apiSlice';
import PostsList from '../post/PostsList';
import LoadingSpinner from '../ui/LoadingSpinner';

import './HomePage.style.scss';

function HomePage() {
  const { data, isLoading, isSuccess, isError, error } = useGetFeedQuery();

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = <PostsList posts={data.posts} />;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <section className='homePage'>{content}</section>;
}

export default HomePage;
