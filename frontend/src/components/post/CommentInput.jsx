import { Formik } from 'formik';
import React from 'react';
import { useCreateCommentMutation } from '../../store/apiSlice';
import './CommentInput.style.scss';

export default function CommentInput({ postId }) {
  const [createComment] = useCreateCommentMutation();

  const validate = (values) => {
    const errors = {};
    if (!values.comment) {
      errors.email = 'Comment is required';
    }
    return errors;
  };

  return (
    <Formik
      initialValues={{ comment: '' }}
      validate={validate}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        createComment({ content: values.comment, postId });
        resetForm();
        setSubmitting(false);
      }}
    >
      {(props) => (
        <form
          method='POST'
          onSubmit={props.handleSubmit}
          className='commentInput'
        >
          <input
            type='text'
            id='comment'
            name='comment'
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.comment}
            placeholder='Add a comment...'
            className='commentInput__inputText'
            autoComplete='off'
          />
          <button
            type='submit'
            disabled={!(props.isValid && props.dirty)}
            className='commentInput__submitBtn'
          >
            Post
          </button>
        </form>
      )}
    </Formik>
  );
}
