import React from 'react';
import './ServerError.style.scss';

function ServerError({ error }) {
  let content = error.data.message;
  if (error.data.message === 'VALIDATION_ERROR') {
    content = (
      <ul>
        {error.data.invalidParams.map((param, index) => (
          <li key={index}>{param.message}</li>
        ))}
      </ul>
    );
  }
  return <p className='serverError'>{content}</p>;
}

export default ServerError;
