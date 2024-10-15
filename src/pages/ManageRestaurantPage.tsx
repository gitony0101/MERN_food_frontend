import { useCreateMyRestaurant } from '../api/restaurant/createRestaurant';
import { useGetMyRestaurant } from '../api/restaurant/getMyRestaurant';
import ManageRestaurantForm from '../forms/manage-restaurant-form/ManageRestaurantForm';

export default function ManageRestaurantPage() {
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  const { restaurant } = useGetMyRestaurant();
  return (
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={createRestaurant}
      isLoading={isLoading}
    />
  );
}
