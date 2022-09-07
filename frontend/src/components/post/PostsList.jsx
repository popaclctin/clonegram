import React from 'react';
import PostExcerpt from './PostExcerpt';
import './PostsList.style.scss';

function PostsList({ posts }) {
  let content;
  if (posts.length === 0) {
    content = <p>There are no posts</p>;
  } else {
    content = (
      <section className='postsList'>
        <ul className='postsList__list'>
          {posts.map((post) => (
            <li key={post._id} className='postsList__item'>
              <PostExcerpt post={post} />
            </li>
          ))}
        </ul>
      </section>
    );
  }
  return <section>{content}</section>;
}

export default PostsList;
