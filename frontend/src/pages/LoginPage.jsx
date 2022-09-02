import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <section>
      <LoginForm />
      <Link to='/signup'>Sign Up</Link>
    </section>
  );
}

export default LoginPage;
