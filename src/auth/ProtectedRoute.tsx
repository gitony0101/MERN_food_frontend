import { useAuth0 } from '@auth0/auth0-react';
import { Outlet } from 'react-router-dom';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return null;
  }
  if (isAuthenticated) {
    return <Outlet />;
  }
}
