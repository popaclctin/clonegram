import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faSquarePlus,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  return (
    <nav className='header__nav'>
      <ul>
        <li>
          <NavLink to='/'>
            <FontAwesomeIcon icon={faHouse} size='xl' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/post/create'>
            <FontAwesomeIcon icon={faSquarePlus} size='xl' />
          </NavLink>
        </li>
        <li>
          <FontAwesomeIcon icon={faCircleUser} size='xl' />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
