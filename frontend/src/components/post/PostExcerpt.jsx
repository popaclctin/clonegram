import React, { useState, Fragment } from 'react';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleUser,
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
      <article key={post.key} className='postExcerpt'>
        <div className='postExcerpt__header'>
          <Link to={`/${post.user.username}`} className='postExcerpt__author'>
            <FontAwesomeIcon
              icon={faCircleUser}
              size='xl'
              className='postExcerpt__author__icon'
            />
            <span className='postExcerpt__author__username'>
              {post.user.username}
            </span>
          </Link>
          <button
            onClick={() => setShowOptionsModal(true)}
            className='postExcerpt__optionsBtn'
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
        </div>
        <div className='postExcerpt__image'>
          <img src={`${API_URL}/uploads/${post.image.name}`} />
        </div>
        <div className='postExcerpt__footer'>
          <div className='postExcerpt__menu'>
            <LikeBtn postId={post._id} />
            <Link to={`/post/${post._id}`} className='postExcerpt__commentBtn'>
              <FontAwesomeIcon icon={faComment} />
            </Link>
          </div>
          <div className='postExcerpt__likes'>
            {isSuccessGetPostLikes && likesData.totalCount} likes
          </div>
          <div className='postExcerpt__caption'>
            <p>
              <Link
                to={`/${post.user.username}`}
                className='postExcerpt__username'
              >
                {post.user.username}
              </Link>{' '}
              {post.caption}
            </p>
          </div>
          <div className='postExcerpt__comments'>
            {isSuccessGetComments &&
              (commentsData.totalCount > 0 ? (
                <Link to={`/post/${post._id}`}>
                  {`View all ${commentsData.totalCount} comments`}
                </Link>
              ) : (
                <p>There are no comments</p>
              ))}
          </div>
          <div className='postExcerpt__timeDistance'>
            <Link to={`/post/${post._id}`}>
              {formatDistanceToNowStrict(new Date(post.createdAt), {
                addSuffix: true,
              })}
            </Link>
          </div>
        </div>
        <div className='postExcerpt__commentInput'>
          <CommentInput postId={post._id} />
        </div>
      </article>
    </Fragment>
  );
}

export default PostExcerpt;
