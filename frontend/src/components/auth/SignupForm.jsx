import React, { useEffect } from 'react';
import { useSignupMutation } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function SignupForm() {
  const navigate = useNavigate();
  const [signupUser, { isLoading, error, isError, isSuccess }] =
    useSignupMutation();

  useEffect(() => {
    if (isSuccess) {
      navigate('/login', { replace: true });
    }
  });

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  return (
    <Formik
      initialValues={{
        email: '',
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        passwordConfirmation: '',
      }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        username: Yup.string().required('Required'),
        firstname: Yup.string().required('Required'),
        lastname: Yup.string().required('Required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters long')
          .required('Required'),
        passwordConfirmation: Yup.string().when('password', {
          is: (val) => (val && val.length > 0 ? true : false),
          then: Yup.string().oneOf(
            [Yup.ref('password')],
            'Password confirmation does not match with password'
          ),
        }),
      })}
      onSubmit={(values, { setSubmitting }) => {
        signupUser({
          email: values.email,
          username: values.username,
          firstname: values.firstname,
          lastname: values.lastname,
          password: values.password,
          passwordConfirmation: values.passwordConfirmation,
        });
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor='email'>Email Address</label>
        <Field name='email' type='email' />
        <ErrorMessage name='email' />

        <label htmlFor='username'>Username</label>
        <Field name='username' type='text' />
        <ErrorMessage name='username' />

        <label htmlFor='firstname'>First name</label>
        <Field name='firstname' type='text' />
        <ErrorMessage name='firstname' />

        <label htmlFor='lastname'>Last name</label>
        <Field name='lastname' type='text' />
        <ErrorMessage name='lastname' />

        <label htmlFor='password'>Password</label>
        <Field name='password' type='password' />
        <ErrorMessage name='password' />

        <label htmlFor='passwordConfirmation'>Confirm password</label>
        <Field name='passwordConfirmation' type='password' />
        <ErrorMessage name='passwordConfirmation' />

        <button type='submit'>Sign Up</button>
      </Form>
    </Formik>
  );
}

export default SignupForm;
