import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import HomePage from './components/pages/HomePage';
import PostPage from './components/pages/PostPage';
import './styles/style.scss';
import UserPage from './components/pages/UserPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
const store = setupStore({});

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='post'>
            <Route path=':postId' element={<PostPage />} />
          </Route>
          <Route path=':username' element={<UserPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route
          path='*'
          element={<h1>The page is in another castle! (404)</h1>}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
);
