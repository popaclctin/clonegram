import React from 'react';
import { useDeletePostMutation, useGetPostsQuery } from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';

function PostsList() {
  const { data, isLoading, isSuccess, isError, error } = useGetPostsQuery();

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
      <h2>Posts</h2>
      {content}
    </section>
  );
}

function PostExcerpt({ post }) {
  const [deletePost, { isLoading, error, isError, isSuccess }] =
    useDeletePostMutation();
  const deletePostHandler = () => {
    deletePost(post._id);
  };
  return (
    <article key={post.key}>
      <h3>{post.caption}</h3>
      <img src={`${API_URL}/uploads/${post.image.name}`} width='300' />
      <Link to={`/post/${post._id}`}>View</Link>
      <button onClick={deletePostHandler}>Delete</button>
    </article>
  );
}

export default PostsList;
