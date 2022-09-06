import React from 'react';
import LoginForm from '../auth/LoginForm';
import { Link } from 'react-router-dom';
import './LoginPage.style.scss';

function LoginPage() {
  return (
    <section className='loginPage'>
      <LoginForm />
      <div className='signUp'>
        <p>
          Don't have an account?
          <Link to='/signup' className='signUp__link'>
            Sign Up
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginPage;
