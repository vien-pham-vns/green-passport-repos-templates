import { DateTime, PaginationRequest, PaginationResponse } from 'types/common';

export enum UserStatus {
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  UNVERIFIED = 'unverified',
}
export enum UserConsentStatus {
  ACCEPTED = 'accepted',
  NOT_GIVEN = 'not_given',
}
export enum UserProfileRole {
  DOA_ADMIN = 'doa_admin',
  DOA_OFFICER = 'doa_officer',
  PACKING_HOUSE_STAFF = 'packing_house_staff',
  FARMER = 'farmer',
  CUTTER = 'cutter',
  BORDER_CHECKPOINT_OFFICER = 'border_checkpoint_officer',
}

export type UserRoleType = `${UserProfileRole}`;

export enum UserForgotPasswordStatus {
  PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS',
  PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED',
  USER_NOT_FOUND = 'user not found',
  USER_ROLE_FORBIDDEN = 'you are not allowed to reset password',
}

// FIXME: update later this type base on profile in userManagement
type Supplier = {
  id: string;
  logo: {
    filenameDisk: string;
  };
  name: string;
  address: string;
  country: string;
  role: string;
};

// FIXME: update later this type base on profile in userManagement
export type UserProfile = {
  id: string;
  role: UserProfileRole;
  userLineId: string;
  supplierId: Supplier;
  consentStatus?: UserConsentStatus;
  consentTime?: DateTime;
  metadata?: any;
};

export type User = UserManagement & {
  location?: string;
  email?: string;
  address?: string;
  description?: string;
  profile?: UserProfile;
};

export type UserManagement = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  status: UserStatus;
  consentStatus: UserConsentStatus | null;
  consentTime: DateTime | null;
  lastAccess: DateTime | null;
  roles: Array<UserProfileRole> | null;
  avatar: {
    filenameDisk: string;
  };
  profile?: {
    nickname: string;
    profileId: string;
    role: UserProfileRole;
    supplier: { id: string; address: string; name: string };
  };
  userLineId: string;
};

export type UsersParams = {
  keyword?: string;
  role?: string;
  status?: UserStatus;
  consentStatus?: UserConsentStatus;
  page?: number;
  size?: number;
  sort?: string;
};

export type UsersResponse = {
  data: User[];
} & PaginationResponse;

export type UserUpdateRequest = {
  firstName?: string;
  lastName?: string;
  location?: string;
  email?: string;
  status?: string;
  description?: string;
  avatar?: string | null;
  phoneNumber?: string;
  address?: string;
  positionTitle?: string;
  supplierId?: string;
};

export type UserUpdateParams = {
  firstName?: string;
  lastName?: string;
  email?: string;
  location?: string;
  status?: string;
  description?: string;
  avatar?: File | null;
  phoneNumber?: string;
  address?: string;
  positionTitle?: string;
  supplierId?: string;
  role: UserProfileRole;
  userProfileId: string;
};

export type UserCreateDOARequest = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  address: string;
  office_name: string;
  role: UserProfileRole;
  locale: string;
};

export type UserCreateBorderCheckpointRequest = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  position_title: string;
  supplier_id: string;
  role?: UserProfileRole;
  locale?: string;
};

export type UserCreateRequest = UserCreateDOARequest | UserCreateBorderCheckpointRequest;

export type UserCreateDOAParams = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  officeName: string;
  role: UserProfileRole;
  locale?: string;
};

export type UserCreateBorderCheckpointParams = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  positionTitle: string;
  supplierId: string;
};

export type UserCreateParams = UserCreateDOAParams | UserCreateBorderCheckpointParams;

export type UserCreateResponse = {
  data: User;
};

export type UserRole = {
  name: string;
  status: string;
  icon: string;
};

export type UserRolesParams = PaginationRequest;

export type UserRolesResponse = {
  data: UserRole[];
} & PaginationResponse;

export interface UserForgotPasswordResponse {
  code: string;
  message: string;
  data: {
    email: string;
    expires_in: number;
    otp: string;
  };
  reqId: string;
}

export interface UserForgotPasswordOTPResponse {
  code: string;
  message: string;
  data: {
    attempts_left: number;
  };
  reqId: string;
}

export interface UserResetPasswordResponse {
  code: string;
  data: {
    email: string;
  };
  message: string;
  msgCode: string;
  reqId: string;
}

export interface UserLoginResponse {
  accessToken: string;
  isFirstLogin: boolean;
}
