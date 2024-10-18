import { useQuery } from 'react-query';
import { RestaurantSearchResponse } from '../../types';
import type { SearchState } from '../../pages/SearchPage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: String,
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set('searchQuery', searchState.searchQuery);
    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}`,
    );
    if (!response.ok) {
      throw new Error('Failed to get restaurant');
    }
    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    ['searchRestaurants'],
    createSearchRequest,
    { enabled: !!city },
  );
  return { results, isLoading };
};
