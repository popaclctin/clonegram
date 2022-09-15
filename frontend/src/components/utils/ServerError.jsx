import React from 'react';
import './ServerError.style.scss';

function ServerError({ error }) {
  let content = error.data.message;
  if (error.data.message === 'VALIDATION_ERROR') {
    content = (
      <ul>
        {error.data.invalidParams.map((param, index) => (
          <li key={index}>{param.msg}</li>
        ))}
      </ul>
    );
  }
  return <div className='serverError'>{content}</div>;
}

export default ServerError;
