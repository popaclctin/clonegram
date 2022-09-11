import React, { useEffect, useRef, useState } from 'react';
import { useCreatePostMutation } from '../../store/apiSlice';
import { Field, Formik } from 'formik';
import useAuth from '../../hooks/useAuth';
import './CreatePost.style.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

function CreatePost({ onClose }) {
  const auth = useAuth();
  const [createPost, { isLoading, error, isError, isSuccess }] =
    useCreatePostMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success('Post created');
      onClose();
    }
  }, [isSuccess]);

  let errorMessage;
  if (isError) {
    if (error.data.message === 'VALIDATION_ERROR') {
      errorMessage = error.data.invalidParams.map((param, index) => (
        <p key={index}>{param.message}</p>
      ));
    } else {
      errorMessage = <p>{error.data.message}</p>;
    }
  }

  return (
    <Formik
      initialValues={{ caption: '', image: null }}
      onSubmit={(values, actions) => {
        const formData = new FormData();
        for (let value in values) {
          formData.append(value, values[value]);
        }
        createPost(formData);
        actions.setSubmitting(false);
      }}
    >
      {(props) => (
        <form
          onSubmit={props.handleSubmit}
          encType='multipart/form-data'
          className='createPost'
        >
          <div className='createPost__header'>
            <p className='createPost__title'>Create new post</p>
            <button
              type='submit'
              className='createPost__submitBtn'
              disabled={!(props.dirty && props.isValid)}
            >
              Share
            </button>
          </div>
          <div className='createPost__body'>
            <Field name='image' component={CustomInputFile} />
            <div className='createPost__caption'>
              <div className='createPost__caption__username'>
                <FontAwesomeIcon icon={faCircleUser} size='xl' />
                <p>{auth.user.username}</p>
              </div>
              <textarea
                name='caption'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.caption}
                placeholder='Write a caption...'
                className='createPost__caption__textarea'
                maxLength={2200}
              ></textarea>
              {props.touched.caption && props.errors.caption ? (
                <div>{props.errors.caption}</div>
              ) : null}
            </div>
          </div>
          {isError && <div>{errorMessage}</div>}
        </form>
      )}
    </Formik>
  );
}

const CustomInputFile = ({ field, form, meta, ...props }) => {
  const [image, setImage] = useState(null);

  const hiddenFileInput = useRef(null);
  const handleClick = (event) => hiddenFileInput.current.click();
  return (
    <div className='createPost__image'>
      <input
        {...props}
        type='file'
        accept='image/*'
        ref={hiddenFileInput}
        onChange={(event) => {
          let reader = new FileReader();
          let file = event.currentTarget.files[0];
          reader.onloadend = () => {
            setImage(reader.result);
          };
          reader.readAsDataURL(file);

          form.setFieldValue(field.name, file);
        }}
        className='createPost__image__inputFile'
      />
      <img src={image} />
      <button
        type='button'
        onClick={handleClick}
        className='createPost__image__selectBtn'
      >
        Select from computer
      </button>
      {form.touched[field.name] && form.errors[field.name] ? (
        <div>{form.errors[field.name]}</div>
      ) : null}
    </div>
  );
};

export default CreatePost;
