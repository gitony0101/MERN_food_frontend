# MERN Food App frond end developing notes

### User profile page ts

```

import { useGetMyUser, useUpdateMyUser } from '../api/MyUserApi';
import UserProfileForm from '../forms/user-profile-form/UserProfileForm';

// export default function UserProfilePage() {
//   const { updateUser, isLoading } = useUpdateMyUser();

//   return <UserProfileForm onSave={updateUser} isLoading={isLoading} />;
// }

export default function UserProfilePage() {
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();
  if (isGetLoading) {
    return <span>Loading....</span>;
  }
  if (!currentUser) {
    return <span>Unable to load user profile</span>;
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
}

```


### My User Api ts

```
import { useAuth0 } from '@auth0/auth0-react';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'sonner';
import type { User } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    return response.json();
  };
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery('fetchCurrentUser', getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }
  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Failed to create user');
    }
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error('Failed to update my user');
    }
    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success('User profile updated successfully!');
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }

  return { updateUser, isLoading };
};


```

## Render




```
> tsc -b && vite build
src/src/components/ui/button.tsx(5,20): error TS2307: Cannot find module '@/lib/utils' or its corresponding type declarations.
src/src/components/ui/form.tsx(13,20): error TS2307: Cannot find module '@/lib/utils' or its corresponding type declarations.
src/src/components/ui/form.tsx(14,23): error TS2307: Cannot find module '@/components/ui/label' or its corresponding type declarations.
src/src/components/ui/label.tsx(5,20): error TS2307: Cannot find module '@/lib/utils' or its corresponding type declarations.
==> Build failed 😞
==> Common ways to troubleshoot your deploy: https://docs.render.com/troubleshooting-deploys

```






10.22 manage restaurant db fully works



```ts
import { CartItem } from "../pages/DetailPage";
import { Restaurant } from "../types";


////

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};


```

- move the  cartItem to the types?




delete logic:

```ts

const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id,
      );

```



```typescript

sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems),
      ); 

```

Encapsulate the logic in the cartItem.ts

```typescript

function saveCartItems(restaurantId, cartItems) {
  sessionStorage.setItem(
    `cartItems-${restaurantId}`,
    JSON.stringify(cartItems)
  );
}

```




