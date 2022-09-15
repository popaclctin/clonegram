import React, { useEffect } from 'react';
import { useLoginMutation } from '../../store/apiSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { Formik } from 'formik';
import ServerError from '../utils/ServerError';
import './AuthForm.style.scss';

function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loginUser, { isLoading, error, isError, isSuccess }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      const ref = location.state?.from;
      ref
        ? navigate(ref.pathname, { replace: true })
        : navigate('/', { replace: true });
    }
  }, [isSuccess]);

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

    //Validate password
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  return (
    <section className='authForm'>
      <h1 className='authForm__title'>Clonegram</h1>
      <Formik
        initialValues={{ email: 'bula@gmail.com', password: 'parola' }}
        validate={validate}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          loginUser({ email: values.email, password: values.password });
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
              type='password'
              id='password'
              name='password'
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              placeholder='Password'
              className='authForm__field'
            />

            <button
              type='submit'
              className='authForm__submitBtn'
              disabled={!props.isValid}
            >
              Log In
            </button>
            {isError && <ServerError error={error} />}
            {props.touched.email && props.errors.email ? (
              <p className='authForm__error'>{props.errors.email}</p>
            ) : null}
            {props.touched.password && props.errors.password ? (
              <p className='authForm__error'>{props.errors.password}</p>
            ) : null}
          </form>
        )}
      </Formik>
    </section>
  );
}

export default LoginForm;
