import React, { Fragment } from 'react';
import { useGetFeedQuery } from '../../store/apiSlice';
import Footer from '../layout/Footer';
import PostsList from '../post/PostsList';
import LoadingSpinner from '../ui/LoadingSpinner';
import AuthUser from '../user/AuthUser';

import './HomePage.style.scss';

function HomePage() {
  const { data, isLoading, isSuccess, isError, error } = useGetFeedQuery();

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <Fragment>
        {data.posts.length !== 0 ? (
          <PostsList posts={data.posts} />
        ) : (
          <p className='homePage__emptyFeed'>Your posts feed is empty</p>
        )}
        <section>
          <AuthUser />
          <Footer />
        </section>
      </Fragment>
    );
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <section className='homePage'>{content}</section>;
}

export default HomePage;
