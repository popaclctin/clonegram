import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetUserByUsernameQuery } from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import Profile from '../user/Profile';
import './UserPage.style.scss';

function UserPage() {
  const { username } = useParams();

  const { data, isLoading, isSuccess, isError, error } =
    useGetUserByUsernameQuery(username);

  let content;

  if (isLoading) {
    content = <LoadingSpinner />;
  } else if (isSuccess) {
    content = <Profile user={data.user} />;
  } else if (isError) {
    content = <div>{JSON.stringify(error)}</div>;
  }

  return <section className='userPage'>{content}</section>;
}

export default UserPage;
