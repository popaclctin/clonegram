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
import useAuth from '../../hooks/useAuth';
import { resetCredentials } from '../../store/authSlice';
import useClickOutside from '../../hooks/useClickOutside';
import Modal from '../ui/Modal';
import CreatePost from '../post/CreatePost';

function Navbar() {
  const [showUserModal, setShowUserModal] = useState(false);
  const [showCreatePostModal, setShowCreatePostModal] = useState(false);

  return (
    <nav className='header__nav'>
      <ul>
        <li>
          <NavLink to='/'>
            <FontAwesomeIcon icon={faHouse} size='xl' />
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => setShowCreatePostModal(true)}
            className='header__nav__createPostBtn'
          >
            <FontAwesomeIcon icon={faSquarePlus} size='xl' />
          </button>
        </li>
        <li>
          <button
            onClick={() => setShowUserModal(true)}
            className='header__nav__userBtn'
          >
            <FontAwesomeIcon icon={faCircleUser} size='xl' />
          </button>
        </li>
      </ul>
      {showUserModal && <UserModal onClose={() => setShowUserModal(false)} />}
      {showCreatePostModal && (
        <CreatePostModal onClose={() => setShowCreatePostModal(false)} />
      )}
    </nav>
  );
}

const UserModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useClickOutside(onClose);
  const auth = useAuth();
  const logoutHandler = () => {
    dispatch(resetCredentials());
    navigate('/login', { replace: true });
  };
  return (
    <div className='userModal' ref={modalRef}>
      <ul>
        <li onClick={onClose}>
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

const CreatePostModal = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
      <CreatePost onClose={onClose} />
    </Modal>
  );
};

export default Navbar;
