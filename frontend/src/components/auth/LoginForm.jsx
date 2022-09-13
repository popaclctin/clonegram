import React, { useEffect } from 'react';
import { useLoginMutation } from '../../store/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useFormik } from 'formik';
import './AuthForm.style.scss';

let errorMessage;

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

  if (isError) {
    if (error.data?.message === 'VALIDATION_ERROR') {
      errorMessage = (
        <ul>
          {error.data.invalidParams.map((param, index) => (
            <li key={index}>{param.message}</li>
          ))}
        </ul>
      );
    } else {
      errorMessage = error.data?.message;
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

    //Validate password
    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { email: 'bula@gmail.com', password: 'parola' },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      loginUser({ email: values.email, password: values.password });
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
          type='password'
          id='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          placeholder='Password'
          className='authForm__field'
        />

        <button
          type='submit'
          className='authForm__submitBtn'
          disabled={!formik.isValid}
        >
          Log In
        </button>
        {isError && <p className='authForm__error'>{errorMessage}</p>}
        {formik.touched.email && formik.errors.email ? (
          <p className='authForm__error'>{formik.errors.email}</p>
        ) : null}
        {formik.touched.password && formik.errors.password ? (
          <p className='authForm__error'>{formik.errors.password}</p>
        ) : null}
      </form>
      <a href='#' className='authForm__forgotPass'>
        Forgotten your password?
      </a>
    </section>
  );
}

export default LoginForm;
