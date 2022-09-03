import React from 'react';
import { useSelector } from 'react-redux';
import PostsList from '../components/post/PostsList';
import { selectCurrentUser } from '../store/authSlice';

function HomePage() {
  return <PostsList />;
}

export default HomePage;
