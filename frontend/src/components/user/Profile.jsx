import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  useFollowUserMutation,
  useGetPostsByUsernameQuery,
} from '../../store/apiSlice';
import PostExcerpt from '../post/PostExcerpt';
import LoadingSpinner from '../ui/LoadingSpinner';

function Profile() {
  const { username } = useParams();
  const { data, isLoading, isSuccess, isError, error } =
    useGetPostsByUsernameQuery(username);
  const [
    followUser,
    {
      isLoading: isLoadingFollow,
      error: errorFollow,
      isError: isErrorFollow,
      isSuccess: isSuccessFollow,
    },
  ] = useFollowUserMutation();

  const followHandler = (event) => {
    followUser({ username });
  };

  useEffect(() => {
    if (isSuccessFollow) {
      alert('User followed');
    }
  }, []);

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
      <button onClick={followHandler}>Follow</button>
      {content}
    </section>
  );
}

export default Profile;
