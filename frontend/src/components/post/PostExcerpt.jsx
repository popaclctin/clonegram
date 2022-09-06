import React from 'react';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { useDeletePostMutation } from '../../store/apiSlice';

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

export default PostExcerpt;
