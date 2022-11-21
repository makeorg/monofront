import { OrganisationType, PersonalityType, UserType } from '@make.org/types';
import { UserService } from '../services/User';

export const authenticationState = async (): Promise<{
  isLoggedIn: boolean;
  user: UserType | OrganisationType | PersonalityType | null;
}> => {
  const user = await UserService.current();
  const profile = user
    ? await UserService.getProfileByUserType(user.userId, user.userType)
    : null;

  const userWithProfile = user
    ? {
        ...user,
        profile,
      }
    : user;

  return {
    isLoggedIn: !!user,
    user: userWithProfile,
  };
};
