import React from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { resetCredentials } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import './Header.style.scss';

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
        <p>Clonegram</p>
      </div>
      <div className='header__search'>
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className='header__search__icon'
        />
        <input
          type='text'
          placeholder='Search'
          className='header__search__input'
        />
      </div>
      <Navbar />
      <button onClick={logoutHandler}>Logout</button>
    </header>
  );
}

export default Header;
