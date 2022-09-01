import React from 'react';

function LoginForm() {
  return (
    <form>
      <div className='form-input'>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' required />
      </div>
      <div className='form-input'>
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' required />
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;
