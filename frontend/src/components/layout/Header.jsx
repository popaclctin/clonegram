import React from 'react';
import Navbar from './Navbar';
import { useDispatch } from 'react-redux';
import { resetCredentials } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(resetCredentials());
    navigate('/login', { replace: true });
  };

  return (
    <header className='header'>
      <div className='logo'>Logo</div>
      <div className='search'>
        <input type='text' placeholder='Search' />
      </div>
      <Navbar />
      <button onClick={logoutHandler}>Logout</button>
    </header>
  );
}

export default Header;
