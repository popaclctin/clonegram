import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeletePostMutation,
  useUnfollowUserMutation,
} from '../../store/apiSlice';
import Modal from '../ui/Modal';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import './OptionsModal.style.scss';

export default function OptionsModal({ post, onClose }) {
  const auth = useAuth();
  const [unfollowUser] = useUnfollowUserMutation();
  const [deletePost] = useDeletePostMutation();

  const navigate = useNavigate();

  const isUserAuth = post.user.username === auth.user.username;

  return (
    <Modal onClose={onClose}>
      {isUserAuth ? (
        <ul className='options'>
          <li className='options__option options__option--red'>
            <button
              onClick={() => {
                deletePost(post._id);
                onClose();
                toast.success('Post deleted');
                navigate(`/${auth.user.username}`, { replace: true });
              }}
            >
              Delete
            </button>
          </li>
          <li className='options__option'>
            <button onClick={() => toast.success('Post edited')}>Edit</button>
          </li>
          <li className='options__option'>
            <button onClick={onClose}>Cancel</button>
          </li>
        </ul>
      ) : (
        <ul className='options'>
          <li className='options__option options__option--red'>
            <button
              onClick={() => {
                unfollowUser(post.user.username);
              }}
            >
              Unfollow
            </button>
          </li>
          <li className='options__option'>
            <button onClick={() => navigate(`/post/${post._id}`)}>
              Go to post
            </button>
          </li>
          <li className='options__option'>
            <button onClick={onClose}>Cancel</button>
          </li>
        </ul>
      )}
    </Modal>
  );
}
