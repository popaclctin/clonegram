import React, { Fragment } from 'react';
import PrivateOutlet from './components/utils/PrivateOutlet';
import Header from './components/layout/Header';
import { ToastContainer } from 'react-toastify';
import { createPortal } from 'react-dom';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <PrivateOutlet />
      </main>
      {createPortal(
        <ToastContainer position='bottom-left' />,
        document.getElementById('toast')
      )}
    </Fragment>
  );
}

export default App;
