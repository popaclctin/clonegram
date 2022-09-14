import React, { useEffect, useState } from 'react';
import { useEditPostMutation } from '../../store/apiSlice';
import { Formik } from 'formik';
import useAuth from '../../hooks/useAuth';
import './EditPost.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { API_URL } from '../../config/config';
import ServerError from '../utils/ServerError';

function EditPost({ onClose, post }) {
  const auth = useAuth();
  const [editPost, { isLoading, error, isError, isSuccess }] =
    useEditPostMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Post edited');
      onClose();
    }
  }, [isSuccess]);

  return (
    <Formik
      initialValues={{ caption: post.caption }}
      onSubmit={(values, actions) => {
        editPost({ caption: values.caption, postId: post._id });
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className='editPost'>
          <div className='editPost__header'>
            <button
              type='text'
              className='editPost__cancelBtn'
              onClick={onClose}
            >
              Cancel
            </button>
            <p className='editPost__title'>Edit info</p>
            <button
              type='submit'
              className='editPost__submitBtn'
              disabled={!(props.isValid && props.dirty)}
            >
              Done
            </button>
          </div>
          <div className='editPost__body'>
            <div className='editPost__image'>
              <img src={`${API_URL}/uploads/${post.image.name}`} />
            </div>
            <div className='editPost__fields'>
              <div className='editPost__user'>
                <FontAwesomeIcon
                  icon={faCircleUser}
                  size='xl'
                  className='editPost__userLogo'
                />
                <p className='editPost__username'>{auth.user.username}</p>
              </div>
              <textarea
                name='caption'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.caption}
                placeholder='Write a caption...'
                className='editPost__caption'
                maxLength={2200}
              ></textarea>
              {props.touched.caption && props.errors.caption ? (
                <div>{props.errors.caption}</div>
              ) : null}
            </div>
          </div>
          {isError && <ServerError error={error} />}
        </form>
      )}
    </Formik>
  );
}

export default EditPost;
