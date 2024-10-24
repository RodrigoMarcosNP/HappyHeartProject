import React from 'react';
import { useSelector } from 'react-redux';

import AppRoutes from './admin.routes';
import AuthRoutes from './auth.routes';

export default function Routes(): React.JSX.Element {
  const authenticated = useSelector(
    (state: {
      auth: {
        authenticated: boolean;
        token: string;
        user: { name: string };
      };
    }) => state.auth.authenticated
  );

  const isAuthenticated = authenticated;
  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
