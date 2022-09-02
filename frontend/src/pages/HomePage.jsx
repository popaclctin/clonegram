import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';

function HomePage() {
  const user = useSelector(selectCurrentUser);
  return <p>Hi, {user.fullName}</p>;
}

export default HomePage;
