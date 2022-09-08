import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHouse,
  faSquarePlus,
  faCircleUser,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.style.scss';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../hooks/useAuth';
import { resetCredentials } from '../../store/authSlice';

function Navbar() {
  const [showUserModal, setShowUserModal] = useState(false);

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
          <button
            onClick={() => setShowUserModal((prevState) => !prevState)}
            className='header__nav__userBtn'
          >
            <FontAwesomeIcon icon={faCircleUser} size='xl' />
          </button>
        </li>
      </ul>
      {showUserModal && <UserModal />}
    </nav>
  );
}

const UserModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const logoutHandler = () => {
    dispatch(resetCredentials());
    navigate('/login', { replace: true });
  };
  return (
    <div className='userModal'>
      <ul>
        <li>
          <button
            onClick={() => {
              navigate(`/${auth.user.username}`);
            }}
          >
            Profile
          </button>
        </li>
        <li className='userModal__logout'>
          <button onClick={logoutHandler}>Log Out</button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
