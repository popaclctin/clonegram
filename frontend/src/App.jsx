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
    </Fragment>
  );
}

export default App;
