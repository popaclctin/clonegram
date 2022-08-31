import React, { Fragment } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Header from './components/layout/Header';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <Outlet />
      </main>
      <footer>This is a footer</footer>
    </Fragment>
  );
}

export default App;
