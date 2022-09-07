import React from 'react';
import { API_URL } from '../../config/config';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsis,
  faHeart as faHeartSolid,
  faComment,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { formatDistance } from 'date-fns';
import {
  useCreatePostLikeMutation,
  useDeleteLikeMutation,
  useGetPostLikesQuery,
} from '../../store/apiSlice';
import { useAuth } from '../../hooks/useAuth';
import './PostExcerpt.style.scss';

function PostExcerpt({ post }) {
  const { data: likesData, isSuccess: isSuccessGetPostLikes } =
    useGetPostLikesQuery({ post: post._id });

  return (
    <article key={post.key} className='postItem'>
      <div className='postItem__header'>
        <Link to={`user/${post.user.username}`} className='postItem__username'>
          {post.user.username}
        </Link>
        <FontAwesomeIcon icon={faEllipsis} />
      </div>
      <div className='postItem__image'>
        <img src={`${API_URL}/uploads/${post.image.name}`} width='300' />
      </div>
      <div className='postItem__footer'>
        <div className='postItem__menu'>
          <LikeBtn postId={post._id} />
          <FontAwesomeIcon icon={faComment} />
        </div>
        <div className='postItem__likes'>
          {isSuccessGetPostLikes && likesData.totalCount} likes
        </div>
        <div className='postItem__comments'>Comments</div>
        <div className='postItem__timeDistance'>
          <Link to={`/post/${post._id}`}>
            {formatDistance(new Date(post.createdAt), new Date(), {
              addSuffix: true,
            })}
          </Link>
        </div>
      </div>
    </article>
  );
}

const LikeBtn = ({ postId }) => {
  const auth = useAuth();
  const [createLike] = useCreatePostLikeMutation();
  const [deleteLike] = useDeleteLikeMutation();
  const {
    data: likesData,
    isSuccess,
    isError,
    error,
  } = useGetPostLikesQuery({
    post: postId,
    user: auth.user.id,
  });

  let content;

  if (isSuccess) {
    content =
      likesData.totalCount === 1 ? (
        <button
          onClick={() => {
            deleteLike(likesData.likes[0]._id);
          }}
        >
          <FontAwesomeIcon icon={faHeartSolid} />
        </button>
      ) : (
        <button
          onClick={() => {
            createLike({ post: postId });
          }}
        >
          <FontAwesomeIcon icon={faHeartRegular} />
        </button>
      );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return content;
};

export default PostExcerpt;
