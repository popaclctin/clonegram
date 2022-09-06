import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostsByUsernameQuery } from '../../store/apiSlice';
import PostExcerpt from '../post/PostExcerpt';
import LoadingSpinner from '../ui/LoadingSpinner';

function Profile() {
  const { username } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetPostsByUsernameQuery(username);

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = data.posts.map((post) => (
      <PostExcerpt key={post._id} post={post} />
    ));
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return (
    <section>
      <h1>Profile</h1>
      {content}
    </section>
  );
}

export default Profile;
