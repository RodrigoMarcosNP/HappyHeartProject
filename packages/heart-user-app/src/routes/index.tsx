import React from 'react';
import { useSelector } from 'react-redux';

import AppRoutes from './admin.routes';
import AuthRoutes from './auth.routes';

export default function Routes() {
  const auth = useSelector(
    (state: { auth: { authenticated: boolean; token: string; user: { name: string, type: string } } }) => state.auth
  );

  const { authenticated, user } = auth;
  
  return authenticated ? <AppRoutes /> : <AuthRoutes />;
}
