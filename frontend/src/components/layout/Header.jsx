import React from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { resetCredentials } from '../../store/authSlice';
import { Link, useNavigate } from 'react-router-dom';

import './Header.style.scss';
import SearchInput from './SearchInput';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(resetCredentials());
    navigate('/login', { replace: true });
  };

  return (
    <header className='header'>
      <div className='header__logo'>
        <Link to='/'>Clonegram</Link>
      </div>
      <SearchInput />
      <Navbar />
      <button onClick={logoutHandler}>Logout</button>
    </header>
  );
}

export default Header;
