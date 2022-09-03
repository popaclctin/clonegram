import React, { useEffect, useRef, useState } from 'react';
import { useCreatePostMutation } from '../../store/apiSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

function CreatePostForm() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  const [createPost, { isLoading, error, isError, isSuccess }] =
    useCreatePostMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  });

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

  const validate = (values) => {
    const errors = {};

    return errors;
  };

  const formik = useFormik({
    initialValues: { caption: '', image: null },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      const formData = new FormData();
      for (let value in values) {
        formData.append(value, values[value]);
      }
      createPost(formData);
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
      <div className='form-input'>
        <label htmlFor='caption'>Caption</label>
        <input
          type='text'
          id='caption'
          name='caption'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.caption}
        />
        {formik.touched.caption && formik.errors.caption ? (
          <div>{formik.errors.caption}</div>
        ) : null}
      </div>
      <div className='form-input'>
        <label htmlFor='password'>Image</label>
        <input
          type='file'
          id='image'
          name='image'
          accept='image/*'
          onChange={(event) => {
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
              setImage(reader.result);
            };
            reader.readAsDataURL(file);

            formik.setFieldValue('image', file);
          }}
          ref={imageRef}
        />
        {formik.touched.image && formik.errors.image ? (
          <div>{formik.errors.image}</div>
        ) : null}
      </div>
      <img src={image} width='300' />
      <button type='submit'>Create post</button>
      {isError && <div>{errorMessage}</div>}
    </form>
  );
}

export default CreatePostForm;
