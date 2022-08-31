import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className='header'>
      <div className='logo'>Logo</div>
      <div className='search'>
        <input type='text' placeholder='Search' />
      </div>
      <nav className='nav'>
        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/test'>Test</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
