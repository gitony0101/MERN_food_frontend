import { useAuth0 } from '@auth0/auth0-react';
import { useMutation } from 'react-query';
import { toast } from 'sonner';
import type { Restaurant } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateRestaurantRequest = async (
    restaurantFormData: FormData,
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });
    if (!response.ok) {
      throw new Error('Failed to update restaurant.');
    }
    return response.json();
  };
  const {
    mutate: updateRestaurant,
    isLoading,
    error,
    isSuccess,
  } = useMutation(updateRestaurantRequest);
  if (isSuccess) {
    toast.success('Restaurants updated successfully.');
  }
  if (error) {
    toast.error('Unable to update restaurant.');
  }
  return { updateRestaurant, isLoading };
};
