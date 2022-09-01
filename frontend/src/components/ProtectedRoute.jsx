import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoute({ redirectPath = '/login', children }) {
  if (true) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? children : <Outlet />;
}

export default ProtectedRoute;
