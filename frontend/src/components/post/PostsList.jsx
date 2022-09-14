import React from 'react';
import PostExcerpt from './PostExcerpt';
import './PostsList.style.scss';

function PostsList({ posts }) {
  let content;
  if (posts.length === 0) {
    content = <p className='postsList__nocontent'>There are no posts</p>;
  } else {
    content = (
      <ul className='postsList__list'>
        {posts.map((post) => (
          <li key={post._id} className='postsList__item'>
            <PostExcerpt post={post} />
          </li>
        ))}
      </ul>
    );
  }
  return <section className='postsList'>{content}</section>;
}

export default PostsList;
