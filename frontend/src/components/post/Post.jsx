import React, { Fragment, useState } from 'react';
import {
  useGetCommentsQuery,
  useGetPostLikesQuery,
} from '../../store/apiSlice';
import LoadingSpinner from '../ui/LoadingSpinner';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import OptionsModal from './OptionsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { formatDistanceToNowStrict, formatDistanceToNow } from 'date-fns';
import LikeBtn from './LikeBtn';
import CommentInput from './CommentInput';
import './Post.style.scss';

//TODO: implement edit

function Post({ post }) {
  const {
    data: likesData,
    isLoading: isLoadingLikes,
    isSuccess: isSuccessLikes,
    isError: isErrorLikes,
    error: errorLikes,
  } = useGetPostLikesQuery({ postId: post._id });
  console.log(post);
  const {
    data: commentsData,
    isLoading: isLoadingComments,
    isSuccess: isSuccessComments,
    isError: isErrorComments,
    error: errorComments,
  } = useGetCommentsQuery({ postId: post._id });
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  let commentsContent;
  if (isLoadingComments) {
    commentsContent = <LoadingSpinner />;
  } else if (isSuccessComments) {
    commentsContent =
      commentsData.totalCount > 0 ? (
        <ul>
          {commentsData.comments.map((comment) => (
            <li key={comment._id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <p className='post__nocomments'>There are no comments</p>
      );
  } else if (isErrorComments) {
    commentsContent = <div>{JSON.stringify(errorComments)}</div>;
  }

  let likesContent;
  if (isLoadingLikes) {
    likesContent = <LoadingSpinner />;
  } else if (isSuccessLikes) {
    likesContent = <p>{likesData.totalCount} likes</p>;
  } else if (isErrorLikes) {
    likesContent = <div>{JSON.stringify(errorLikes)}</div>;
  }

  return (
    <Fragment>
      {showOptionsModal && (
        <OptionsModal onClose={() => setShowOptionsModal(false)} post={post} />
      )}
      <article className='post'>
        <div className='post__image'>
          <img src={`${API_URL}/uploads/${post.image.name}`} />
        </div>
        <div className='post__body'>
          <div className='post__header'>
            <Link to={`/${post.user.username}`} className='post__author'>
              <FontAwesomeIcon
                icon={faCircleUser}
                size='xl'
                className='post__author__icon'
              />
              <p className='post__author__username'>{post.user.username}</p>
            </Link>
            <button
              onClick={() => setShowOptionsModal(true)}
              className='post__optionsBtn'
            >
              <FontAwesomeIcon icon={faEllipsis} />
            </button>
          </div>
          <div className='post__comments'>{commentsContent}</div>
          <div className='post__footer'>
            <div className='post__menu'>
              <LikeBtn postId={post._id} />
            </div>
            <div className='post__likes'>{likesContent}</div>
            <div className='post__timeDistance'>
              <Link to={`/post/${post._id}`}>
                {formatDistanceToNowStrict(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </Link>
            </div>
          </div>
          <div className='post__commentInput'>
            <CommentInput postId={post._id} />
          </div>
        </div>
      </article>
    </Fragment>
  );
}

const Comment = ({ comment }) => {
  return (
    <div className='comment'>
      <div className='comment__icon'>
        <FontAwesomeIcon icon={faCircleUser} />
      </div>
      <div className='comment__body'>
        <p className='comment__content'>
          <span className='comment__username'>{comment.user.username}</span>
          <span>{comment.content}</span>
        </p>
        <p className='comment__timeDistance'>
          {formatDistanceToNow(new Date(comment.createdAt))}
        </p>
      </div>
    </div>
  );
};

export default Post;
