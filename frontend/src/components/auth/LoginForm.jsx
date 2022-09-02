import React, { useEffect } from 'react';
import { useLoginMutation } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function LoginForm() {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error, isError, isSuccess }] =
    useLoginMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/', { replace: true });
    }
  });

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters long')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        loginUser({ email: values.email, password: values.password });
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor='email'>Email Address</label>
        <Field name='email' type='email' />
        <ErrorMessage name='email' />

        <label htmlFor='password'>Password</label>
        <Field name='password' type='password' />
        <ErrorMessage name='password' />

        <button type='submit'>Login</button>
      </Form>
    </Formik>
  );
}

export default LoginForm;
