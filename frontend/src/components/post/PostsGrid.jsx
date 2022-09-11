import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { API_URL } from '../../config/config';
import './PostsGrid.style.scss';

function PostsGrid({ posts }) {
  return (
    <section className='postsGrid'>
      <ul>
        {posts.map((post) => (
          <li key={post._id}>
            <Link to={`/post/${post._id}`}>
              <PostGridItem post={post} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const PostGridItem = ({ post }) => {
  const [showOverlay, setShowOverlay] = useState(false);
  return (
    <div
      className='postGridItem'
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(false)}
    >
      <img src={`${API_URL}/uploads/${post.image.name}`} />
      {showOverlay && <ItemOverlay post={post} />}
    </div>
  );
};

const ItemOverlay = ({ post }) => {
  return (
    <div className='itemOverlay'>
      <p className='itemOverlay__stat'>
        <span className='itemOverlay__stat__icon'>
          <FontAwesomeIcon icon={faHeart} />
        </span>
        {post.likesCount}
      </p>
      <p className='itemOverlay__stat'>
        <span className='itemOverlay__stat__icon'>
          <FontAwesomeIcon icon={faComment} />
        </span>
        {post.commentsCount}
      </p>
    </div>
  );
};

export default PostsGrid;
