import { useFormContext } from 'react-hook-form';
import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/ui/form';
import { cuisineList } from '../../config/restaurant-options-config';
import CuisineCheckbox from './CuisineCheckBox.tsx';

export default function CuisinesSection() {
  const { control } = useFormContext();
  return (
    <div>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Cuisines</h2>
        <FormDescription>
          Select the cuisines that your restaurant serves
        </FormDescription>
      </div>
      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="gird md:grid-cols-5 gap-1">
              {cuisineList.map((cusineItem) => (
                <CuisineCheckbox cuisine={cusineItem} field={field} />
              ))}
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
