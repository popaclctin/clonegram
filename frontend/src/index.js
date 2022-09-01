import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './store';
import { Provider } from 'react-redux';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path='/' element={<App />}>
            <Route path='test' element={<h1>Hello Test!</h1>} />
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<h1>This is the signup page</h1>} />
        <Route
          path='*'
          element={<h1>The page is in another castle! (404)</h1>}
        />
      </Routes>
    </Provider>
  </BrowserRouter>
);
