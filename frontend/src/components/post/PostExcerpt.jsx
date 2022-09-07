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
import { formatDistance } from 'date-fns';
import {
  useCreatePostLikeMutation,
  useDeleteLikeMutation,
  useGetPostLikesQuery,
  useGetCommentsQuery,
  useCreateCommentMutation,
} from '../../store/apiSlice';
import { useAuth } from '../../hooks/useAuth';
import { useFormik } from 'formik';
import './PostExcerpt.style.scss';
import Modal from '../ui/Modal';

function PostExcerpt({ post }) {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prevState) => !prevState);
  };

  const { data: likesData, isSuccess: isSuccessGetPostLikes } =
    useGetPostLikesQuery({ postId: post._id });
  const { data: commentsData, isSuccess: isSuccessGetComments } =
    useGetCommentsQuery({ postId: post._id });

  return (
    <Fragment>
      {showModal && <PostModal onClose={toggleModal} />}
      <article key={post.key} className='postItem'>
        <div className='postItem__header'>
          <Link
            to={`user/${post.user.username}`}
            className='postItem__username'
          >
            {post.user.username}
          </Link>
          <button onClick={toggleModal}>
            <FontAwesomeIcon icon={faEllipsis} />
          </button>
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
          <div className='postItem__caption'>
            <p>
              <Link
                to={`user/${post.user.username}`}
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
              {formatDistance(new Date(post.createdAt), new Date(), {
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
    postId,
    userId: auth.user.id,
  });

  let content;

  if (isSuccess) {
    content =
      likesData.totalCount === 1 ? (
        <button
          onClick={() => {
            deleteLike(likesData.likes[0]._id);
          }}
          className='postItem__likeBtn'
        >
          <FontAwesomeIcon icon={faHeartSolid} />
        </button>
      ) : (
        <button
          onClick={() => {
            createLike({ postId });
          }}
          className='postItem__likeBtn'
        >
          <FontAwesomeIcon icon={faHeartRegular} />
        </button>
      );
  } else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
  }
  return content;
};

const CommentInput = ({ postId }) => {
  const [createComment] = useCreateCommentMutation();

  const validate = (values) => {
    const errors = {};
    if (!values.comment) {
      errors.email = 'Comment is required';
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: { comment: '' },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      createComment({ content: values.comment, postId });
      setSubmitting(false);
    },
  });

  return (
    <form
      method='POST'
      onSubmit={formik.handleSubmit}
      className='postItem__commentForm'
    >
      <input
        type='text'
        id='comment'
        name='comment'
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.comment}
        placeholder='Add a comment...'
      />
      <button type='submit' disabled={!(formik.isValid && formik.dirty)}>
        Post
      </button>
    </form>
  );
};

const PostModal = (props) => {
  return (
    <Modal onClose={props.onClose}>
      <ul>
        <li>Delete</li>
        <li>Unfollow</li>
        <li>Go to post</li>
        <li>Cancel</li>
      </ul>
    </Modal>
  );
};

export default PostExcerpt;
