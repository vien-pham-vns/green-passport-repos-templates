export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phoneNumber?: string;
  avatar?: string;
  image?: string;
  role?: string;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}
