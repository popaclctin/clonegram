import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/test'>Test</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
