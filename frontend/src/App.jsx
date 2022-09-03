import React, { Fragment } from 'react';
import PrivateOutlet from './components/utils/PrivateOutlet';
import Header from './components/layout/Header';

function App() {
  return (
    <Fragment>
      <Header />
      <main>
        <PrivateOutlet />
      </main>
      <footer>This is a footer</footer>
    </Fragment>
  );
}

export default App;
