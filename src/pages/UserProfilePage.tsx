import { useGetMyUser } from '../api/user/useGetMyUser';
import { useUpdateMyUser } from '../api/user/useUpdateMyUser';
import UserProfileForm from '../forms/user-profile-form/UserProfileForm';

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
