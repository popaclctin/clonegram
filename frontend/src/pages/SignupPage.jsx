import React from 'react';
import SignupForm from '../components/auth/SignupForm';
import { Link } from 'react-router-dom';
import './SignupPage.style.scss';

function SignupPage() {
  return (
    <section className='signupPage'>
      <SignupForm />
      <div className='login'>
        <p>
          Have an account?
          <Link to='/login' className='login__link'>
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}

export default SignupPage;
