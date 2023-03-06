import React from 'react';

// eslint-disable-next-line import/named
import {RouteProps} from 'react-router';
import {Redirect, Route} from 'react-router-dom';

import {useAuth} from '../services/authState/authProvider';

function getAuthData(auth): {
  isAuthenticated: boolean;
} {
  return {
    isAuthenticated: auth.currentUserData !== null,
  };
}

export function PrivateRoute({
  children,
  ...rest
}: {
  children: React.ReactNode;
} & RouteProps): JSX.Element {
  const {isAuthenticated} = getAuthData(useAuth());
  if (isAuthenticated) {
    return <Route {...rest} render={() => children} />;
  } else {
    return <Redirect to="/auth/login" />;
  }
}
