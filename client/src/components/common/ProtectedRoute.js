import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, user, ...rest }) => {
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
