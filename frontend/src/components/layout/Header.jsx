import React from 'react';
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';

function Header() {
  return (
    <header className='header'>
      <div className='logo'>Logo</div>
      <div className='search'>
        <input type='text' placeholder='Search' />
      </div>
      <Navbar />
    </header>
  );
}

export default Header;
