import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/authSlice';

function ProtectedRoute({ redirectPath = '/login', children }) {
  const user = useSelector(selectCurrentUser);
  if (!user) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
