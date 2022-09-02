import React, { useEffect } from 'react';
import { useLoginMutation } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import './LoginForm.style.scss';

function LoginForm() {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error, isError, isSuccess }] =
    useLoginMutation();

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
    //Validate email
    if (!values.email) {
      errors.email = 'Required';
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address';
    }

    //Validate password
    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length < 6) {
      errors.password = 'Must be at least 6 characters';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validate,
    onSubmit: (values, { setSubmitting }) => {
      loginUser({ email: values.email, password: values.password });
      setSubmitting(false);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className='loginForm'>
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
      <button type='submit'>Login</button>
      {isError && <div>{errorMessage}</div>}
    </form>
  );
}

export default LoginForm;
