import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='test' element={<h1>Hello Test!</h1>} />
          <Route path='*' element={<h1>The page is in another castle!</h1>} />
        </Route>
      </Routes>
    </Provider>
  </BrowserRouter>
);
