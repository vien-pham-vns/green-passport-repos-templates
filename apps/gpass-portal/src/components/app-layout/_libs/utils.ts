import { UserProfileRole } from 'types/user';

const allowedRoles = [''];

export const hasPermission = (userRole: UserProfileRole | undefined) => {
  if (userRole === undefined) {
    return false;
  }

  return allowedRoles.includes(userRole);
};
