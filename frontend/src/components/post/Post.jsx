import React from 'react';
import {
  useDeletePostMutation,
  useGetPostByIdQuery,
} from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import { API_URL } from '../../config/config';
import { useParams } from 'react-router-dom';

function Post() {
  const params = useParams();
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostByIdQuery(params.postId);
  const [deletePost] = useDeletePostMutation();
  const deletePostHandler = () => {
    deletePost(post._id);
  };
  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = (
      <section>
        <h2>{post.caption}</h2>
        <img src={`${API_URL}/uploads/${post.image.name}`} width='300' />
        <button onClick={deletePostHandler}>Delete</button>
      </section>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return content;
}

export default Post;
