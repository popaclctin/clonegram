import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './AuthUser.style.scss';

function AuthUser() {
  const { user } = useAuth();
  return (
    <div className='authUser'>
      <div className='authUser__profileIcon'>
        <Link to={`/${user.username}`}>
          <FontAwesomeIcon icon={faCircleUser} size='xl' />
        </Link>
      </div>
      <div className='authUser__info'>
        <p className='authUser__username'>{user.username}</p>
        <p className='authUser__fullname'>{user.fullName}</p>
      </div>
    </div>
  );
}

export default AuthUser;
