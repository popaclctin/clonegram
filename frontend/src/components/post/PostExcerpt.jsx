import React, { useState, Fragment } from 'react';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as faHeartRegular,
  faComment,
} from '@fortawesome/free-regular-svg-icons';
import { formatDistanceToNowStrict } from 'date-fns';
import {
  useGetPostLikesQuery,
  useGetCommentsQuery,
} from '../../store/apiSlice';

import './PostExcerpt.style.scss';
import OptionsModal from './OptionsModal';
import CommentInput from './CommentInput';
import LikeBtn from './LikeBtn';

function PostExcerpt({ post }) {
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const { data: likesData, isSuccess: isSuccessGetPostLikes } =
    useGetPostLikesQuery({ postId: post._id });
  const { data: commentsData, isSuccess: isSuccessGetComments } =
    useGetCommentsQuery({ postId: post._id });

  return (
    <Fragment>
      {showOptionsModal && (
        <OptionsModal onClose={() => setShowOptionsModal(false)} post={post} />
      )}
      <article key={post.key} className='postItem'>
        <div className='postItem__header'>
          <Link to={`/${post.user.username}`} className='postItem__username'>
            {post.user.username}
          </Link>
          <button
            onClick={() => setShowOptionsModal(true)}
            className='postItem__optionsBtn'
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
        <div className='postItem__image'>
          <img src={`${API_URL}/uploads/${post.image.name}`} />
        </div>
        <div className='postItem__footer'>
          <div className='postItem__menu'>
            <LikeBtn postId={post._id} />
            <Link to={`/post/${post._id}`} className='postItem__commentBtn'>
              <FontAwesomeIcon icon={faComment} />
            </Link>
          </div>
          <div className='postItem__likes'>
            {isSuccessGetPostLikes && likesData.totalCount} likes
          </div>
          <div className='postItem__caption'>
            <p>
              <Link
                to={`/${post.user.username}`}
                className='postItem__username'
              >
                {post.user.username}
              </Link>{' '}
              {post.caption}
            </p>
          </div>
          <div className='postItem__comments'>
            {isSuccessGetComments &&
              (commentsData.totalCount > 0 ? (
                <Link to={`/post/${post._id}`}>
                  {`View all ${commentsData.totalCount} comments`}
                </Link>
              ) : (
                <p>There are no comments</p>
              ))}
          </div>
          <div className='postItem__timeDistance'>
            <Link to={`/post/${post._id}`}>
              {formatDistanceToNowStrict(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </Link>
          </div>
        </div>
        <div className='postItem__commentInput'>
          <CommentInput postId={post._id} />
        </div>
      </article>
    </Fragment>
  );
}

export default PostExcerpt;
