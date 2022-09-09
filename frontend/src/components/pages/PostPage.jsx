import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostByIdQuery } from '../../store/apiSlice';
import Post from '../post/Post';
import LoadingSpinner from '../ui/LoadingSpinner';
import './PostPage.style.scss';

function PostPage() {
  const params = useParams();
  const {
    data: post,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPostByIdQuery(params.postId);

  let content;
  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = <Post post={post} />;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <section className='postPage'>{content}</section>;
}

export default PostPage;
