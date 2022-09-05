import React, { useEffect } from 'react';
import { useSignupMutation } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './AuthForm.style.scss';

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
        <p key={index}>{param.msg}</p>
      ));
    } else {
      errorMessage = <p>{error.data.message}</p>;
    }
  }

  const validate = (values) => {
    const errors = {};
    //Validate email
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    //Validate username
    if (!values.username) {
      errors.username = 'Username is required';
    }

    //Validate password
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    //Validate password confirmation
    if (!values.passwordConfirmation) {
      errors.passwordConfirmation = 'Password confirmation is required';
    } else if (values.passwordConfirmation !== values.password) {
      errors.passwordConfirmation = 'Passwords are not the same';
    }

    //Validate first name
    if (!values.firstname) {
      errors.firstname = 'First name is required';
    }

    //Validate last name
    if (!values.lastname) {
      errors.lastname = 'Last name is required';
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
    <section className='authForm'>
      <h1 className='authForm__title'>Clonegram</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type='email'
          id='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          placeholder='Email'
          className='authForm__field'
        />

        <input
          type='text'
          id='username'
          name='username'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          placeholder='Username'
          className='authForm__field'
        />

        <input
          type='password'
          id='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder='Password'
          className='authForm__field'
        />

        <input
          type='password'
          id='passwordConfirmation'
          name='passwordConfirmation'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.passwordConfirmation}
          placeholder='Confirm password'
          className='authForm__field'
        />

        <input
          type='text'
          id='firstname'
          name='firstname'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstname}
          placeholder='First name'
          className='authForm__field'
        />

        <input
          type='text'
          id='lastname'
          name='lastname'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastname}
          placeholder='Last name'
          className='authForm__field'
        />

        <button
          type='submit'
          className='authForm__submitBtn'
          disabled={!(formik.isValid && formik.dirty)}
        >
          Signup
        </button>
        {isError && <p className='authForm__error'>{errorMessage}</p>}
        {formik.touched.email && formik.errors.email ? (
          <p className='authForm__error'>{formik.errors.email}</p>
        ) : null}
        {formik.touched.username && formik.errors.username ? (
          <p className='authForm__error'>{formik.errors.username}</p>
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <p className='authForm__error'>{formik.errors.password}</p>
        ) : null}
        {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation ? (
          <p className='authForm__error'>
            {formik.errors.passwordConfirmation}
          </p>
        ) : null}
        {formik.touched.firstname && formik.errors.firstname ? (
          <p className='authForm__error'>{formik.errors.firstname}</p>
        ) : null}
        {formik.touched.lastname && formik.errors.lastname ? (
          <p className='authForm__error'>{formik.errors.lastname}</p>
        ) : null}
      </form>
    </section>
  );
}

export default SignupForm;
