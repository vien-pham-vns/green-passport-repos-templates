export const CONFLICT_ERROR_TYPES = {
  PHONE_NUMBER: 'PHONE_NUMBER_EXISTS',
  EMAIL: 'EMAIL_EXISTS',
} as const;

export const NEXT_LOCALE = 'NEXT_LOCALE';
export const TOKEN_COOKIE_NAME = 'credentials';
export const PROFILE_ID_COOKIE_NAME = 'X-PROFILE-ID';
export const HEADER_ACCESS_TOKEN = 'accessToken';

export const ARRAY_SEPARATOR = ',';

export const ALLOWED_PAGE_SIZE = [5, 10, 20, 50, 100];

export const DEFAULT_PAGE_SIZE = ALLOWED_PAGE_SIZE[1];
export const DEFAULT_PAGE = 1;
export const DEFAULT_TRUE = 1;
export const DEFAULT_FALSE = 0;
