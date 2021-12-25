import { Route, Navigate } from 'react-router-dom';
import React from 'react';
import { useSelector } from 'react-redux';
export function PrivateRoute({ path, ...props }) {
  const login = useSelector((state) => state.auth.login);
  const { isUserLoggedIn } = login;
  return isUserLoggedIn ? (
    <Route path={path} {...props} />
  ) : (
    <Navigate state={{ from: path }} replace to='/' />
  );
}
