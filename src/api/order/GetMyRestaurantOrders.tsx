import { useAuth0 } from '@auth0/auth0-react';
import { useQuery } from 'react-query';

import type { Order } from '../../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    return response.json();
  };
  const { data: orders, isLoading } = useQuery(
    'fetchMyRestaurantOrders',
    getMyRestaurantOrdersRequest,
  );
  return { orders, isLoading };
};
