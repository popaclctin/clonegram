import React, { useEffect } from 'react';
import { useSignupMutation } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './SignupForm.style.scss';

function SignupForm() {
  const navigate = useNavigate();
  const [signupUser, { isLoading, error, isError, isSuccess }] =
    useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login', { replace: true });
    }
  });

  let errorMessage;
  if (isError) {
    if (error.data.message === 'VALIDATION_ERROR') {
      errorMessage = error.data.invalidParams.map((param, index) => (
        <p key={index}>{`${param.param}:${param.msg}`}</p>
      ));
    } else {
      errorMessage = <p>{error.data.message}</p>;
    }
  }

  const validate = (values) => {
    const errors = {};
    //Validate email
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    //Validate username
    if (!values.username) {
      errors.username = 'Required';
    }

    //Validate password
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be at least 6 characters';
    }

    //Validate password confirmation
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Required';
    } else if (values.passwordConfirmation !== values.password) {
      errors.passwordConfirmation = 'Passwords are not the same';
    }

    //Validate first name
    if (!values.firstname) {
      errors.firstname = 'Required';
    }

    //Validate last name
    if (!values.lastname) {
      errors.lastname = 'Required';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      firstname: '',
      lastname: '',
    },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      signupUser({
        email: values.email,
        username: values.username,
        password: values.password,
        passwordConfirmation: values.passwordConfirmation,
        firstname: values.firstname,
        lastname: values.lastname,
      });
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='signupForm'>
      <div className='form-input'>
        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
      </div>
      <div className='form-input'>
        <label htmlFor='username'>Username</label>
        <input
          type='text'
          id='username'
          name='username'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
        />
        {formik.touched.username && formik.errors.username ? (
          <div>{formik.errors.username}</div>
        ) : null}
      </div>
      <div className='form-input'>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}
      </div>
      <div className='form-input'>
        <label htmlFor='passwordConfirmation'>Confirm password</label>
        <input
          type='password'
          id='passwordConfirmation'
          name='passwordConfirmation'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
        />
        {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation ? (
          <div>{formik.errors.passwordConfirmation}</div>
        ) : null}
      </div>
      <div className='form-input'>
        <label htmlFor='firstname'>First name</label>
        <input
          type='text'
          id='firstname'
          name='firstname'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstname}
        />
        {formik.touched.firstname && formik.errors.firstname ? (
          <div>{formik.errors.firstname}</div>
        ) : null}
      </div>
      <div className='form-input'>
        <label htmlFor='lastname'>Last name</label>
        <input
          type='text'
          id='lastname'
          name='lastname'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastname}
        />
        {formik.touched.lastname && formik.errors.lastname ? (
          <div>{formik.errors.lastname}</div>
        ) : null}
      </div>
      <button type='submit'>Signup</button>
      {isError && <div>{errorMessage}</div>}
    </form>
  );
}

export default SignupForm;
