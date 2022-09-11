import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useDeletePostMutation,
  useDeleteFollowMutation,
  useGetFollowQuery,
} from '../../store/apiSlice';
import Modal from '../ui/Modal';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
import './PostOptionsModal.style.scss';
import LoadingSpinner from '../ui/LoadingSpinner';
import EditPost from './EditPost';

export default function PostOptionsModal({ post, onClose }) {
  const auth = useAuth();
  const [showEditPostModal, setShowEditPostModal] = useState(false);
  const isUserAuth = post.user._id === auth.user.id;

  const {
    data: followData,
    isSuccess,
    isLoading,
    isError,
    error,
  } = useGetFollowQuery(
    {
      userId: auth.user.id,
      followeeId: post.user._id,
    },
    { skip: isUserAuth }
  );

  const [deleteFollow] = useDeleteFollowMutation();
  const [deletePost] = useDeletePostMutation();
  const navigate = useNavigate();

  let content;

  if (isUserAuth) {
    content = (
      <Modal onClose={onClose}>
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
            <button onClick={() => setShowEditPostModal(true)}>Edit</button>
          </li>
          <li className='options__option'>
            <button onClick={onClose}>Cancel</button>
          </li>
        </ul>
        {showEditPostModal && (
          <EditPostModal
            onClose={() => setShowEditPostModal(false)}
            post={post}
          />
        )}
      </Modal>
    );
  } else {
    if (isLoading) {
      content = <LoadingSpinner />;
    } else if (isSuccess) {
      content = (
        <Modal onClose={onClose}>
          <ul className='options'>
            <li className='options__option options__option--red'>
              <button
                onClick={() => {
                  deleteFollow(followData.follow._id);
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
        </Modal>
      );
    } else if (isError) {
      content =
        error.status === 404 ? (
          <Modal onClose={onClose}>
            <ul className='options'>
              <li className='options__option'>
                <button
                  onClick={() => {
                    followUser(post.user.username);
                  }}
                >
                  Follow
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
          </Modal>
        ) : (
          <p>{JSON.stringify(error)}</p>
        );
    }
  }

  return content;
}

const EditPostModal = ({ onClose, post }) => {
  return (
    <Modal onClose={onClose}>
      <EditPost onClose={onClose} post={post} />
    </Modal>
  );
};
