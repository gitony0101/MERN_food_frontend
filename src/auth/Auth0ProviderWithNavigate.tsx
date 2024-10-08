import {
  Auth0Provider,
  useAuth0,
  type AppState,
  type User,
} from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { useCreateMyUser } from '../api/MyUserApi';

type Props = {
  children: React.ReactNode;
};

const Auth0ProviderWithNavigate = ({ children }: Props) => {
  const { createUser } = useCreateMyUser();
  const navigate = useNavigate();
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_AUTH0_CALL_BACK_URL;
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

  if (!domain || !clientId || !redirectUri || !audience) {
    throw new Error('Unable to initialize Auth');
  }
  const onRedirectCallback = (appState?: AppState, user?: User) => {
    if (user?.sub && user?.email) {
      createUser({ auth0Id: user.sub, email: user.email });
    }
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithNavigate;
