import { z } from 'zod';

const formSchema = z.object({
  restaurantName: z.string({ required_error: 'restaurant name is required' }),
});

//6:20

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading }: Props) => {
  return;
};

export default ManageRestaurantForm;
