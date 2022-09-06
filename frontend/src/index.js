import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import store from './store/store';
import { Provider } from 'react-redux';
import LoginPage from './components/pages/LoginPage';
import SignupPage from './components/pages/SignupPage';
import HomePage from './components/pages/HomePage';
import CreatePostForm from './components/post/CreatePostForm';
import Post from './components/post/Post';
import './styles/style.scss';
import Profile from './components/user/Profile';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='post'>
            <Route path=':postId' element={<Post />} />
            <Route path='create' element={<CreatePostForm />} />
          </Route>
          <Route path='user'>
            <Route index element={<Profile />} />
            <Route path=':username' element={<Profile />} />
          </Route>
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
