import React from 'react';
import SignupForm from '../components/auth/SignupForm';
import { Link } from 'react-router-dom';

function SignupPage() {
  return (
    <section>
      <SignupForm />
      <Link to='/login'>Log In</Link>
    </section>
  );
}

export default SignupPage;
