import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, user, ...rest }) => {
  // checking if user is hitting admin route and if he has admin role to grant access
  if (rest.path === '/admin' && user.role !== 'admin') {
    return (
      <Redirect
        to={{
          pathname: '/main'
        }}
      />
    );
  }
  return (
    <Route
      {...rest}
      render={props => {
        if (user) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: '/signin',
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
