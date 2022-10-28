import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({
  component: Component,
  loggedIn,
  ...props
}) {
  return (
    <Route>
      {loggedIn ? <Component {...props} /> : <Redirect to='/' />}
    </Route>
  );
}
