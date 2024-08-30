import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  // Return the component if authenticated, otherwise redirect to login
  return isAuthenticated ? Component : <Navigate to="/" />;
};

export default ProtectedRoute;
