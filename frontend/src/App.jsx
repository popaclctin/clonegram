import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path='/' element={<h1>Hello Humanity!</h1>} />
      <Route path='/test' element={<h1>Hello Test!</h1>} />
      <Route path='*' element={<h1>The page is in another castle!</h1>} />
    </Routes>
  );
}

export default App;
