import React, { useEffect } from 'react';
import { useSignupMutation } from '../../store/apiSlice';
import { useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import ServerError from '../utils/ServerError';
import LoadingSpinner from '../ui/LoadingSpinner';
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
    if (!values.firstName) {
      errors.firstName = 'First name is required';
    }

    //Validate last name
    if (!values.lastName) {
      errors.lastName = 'Last name is required';
    }

    return errors;
  };

  return (
    <section className='authForm'>
      <h1 className='authForm__title'>Clonegram</h1>
      <Formik
        initialValues={{
          email: '',
          username: '',
          password: '',
          passwordConfirmation: '',
          firstName: '',
          lastName: '',
        }}
        validate={validate}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          signupUser({
            email: values.email,
            username: values.username,
            password: values.password,
            passwordConfirmation: values.passwordConfirmation,
            firstName: values.firstName,
            lastName: values.lastName,
          });
          setSubmitting(false);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <input
              type='email'
              id='email'
              name='email'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              placeholder='Email'
              className='authForm__field'
            />

            <input
              type='text'
              id='username'
              name='username'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.username}
              placeholder='Username'
              className='authForm__field'
            />

            <input
              type='password'
              id='password'
              name='password'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              placeholder='Password'
              className='authForm__field'
            />

            <input
              type='password'
              id='passwordConfirmation'
              name='passwordConfirmation'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.passwordConfirmation}
              placeholder='Confirm password'
              className='authForm__field'
            />

            <input
              type='text'
              id='firstName'
              name='firstName'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.firstName}
              placeholder='First name'
              className='authForm__field'
            />

            <input
              type='text'
              id='lastName'
              name='lastName'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.lastName}
              placeholder='Last name'
              className='authForm__field'
            />

            <button
              type='submit'
              className='authForm__submitBtn'
              disabled={!(props.isValid && props.dirty)}
            >
              {isLoading ? <LoadingSpinner /> : 'Signup'}
            </button>
            {isError && <ServerError error={error} />}
            {props.touched.email && props.errors.email ? (
              <p className='authForm__error'>{props.errors.email}</p>
            ) : null}
            {props.touched.username && props.errors.username ? (
              <p className='authForm__error'>{props.errors.username}</p>
            ) : null}
            {props.touched.password && props.errors.password ? (
              <p className='authForm__error'>{props.errors.password}</p>
            ) : null}
            {props.touched.passwordConfirmation &&
            props.errors.passwordConfirmation ? (
              <p className='authForm__error'>
                {props.errors.passwordConfirmation}
              </p>
            ) : null}
            {props.touched.firstName && props.errors.firstName ? (
              <p className='authForm__error'>{props.errors.firstName}</p>
            ) : null}
            {props.touched.lastName && props.errors.lastName ? (
              <p className='authForm__error'>{props.errors.lastName}</p>
            ) : null}
          </form>
        )}
      </Formik>
    </section>
  );
}

export default SignupForm;
