// import { AppConfig } from 'app-config';
// import { redirectToLogin } from 'app/actions/auth';
// import {
//   User,
//   UserForgotPasswordOTPResponse,
//   UserForgotPasswordResponse,
//   UserLoginResponse,
//   UserResetPasswordResponse,
// } from 'types/user';
// import { removeBearerToken, setBearerToken } from 'utils/storage';

// import { setCredential, setProfileId } from '@/lib/cookies';

// import { api } from './common';

// export const login = async (email: string, password: string) => {
//   const { data } = await post<{ data: UserLoginResponse }, unknown>(
//     api('user/login', 'v1'),
//     {
//       email,
//       password,
//     }
//   );

//   if (data) {
//     // START: TEMP for localhost dev only
//     if (AppConfig.LOCAL_DEV) {
//       setBearerToken(data.accessToken);
//     }
//     // END
//     await setCredential(data.accessToken);
//   }

//   return data;
// };

// export const me = async () => {
//   const data = await get<{ data: User }>(api('user/me', 'v1'));
//   if (data && data?.data.profile) {
//     await setProfileId(data?.data?.profile.id);
//   }

//   return data;
// };

// export const logout = async () => {
//   if (AppConfig.LOCAL_DEV) {
//     removeBearerToken();
//   }

//   await redirectToLogin();
//   await post(api('user/logout', 'v1'));
// };

// export const forgotPassword = async (email: string, locale: string) => {
//   return post<UserForgotPasswordResponse, unknown>(
//     api('doa/request-reset-password', 'v2'),
//     {
//       email,
//       locale,
//     }
//   );
// };

// export const forgotPasswordOtp = async (email: string, otp: string) => {
//   return post<UserForgotPasswordOTPResponse, unknown>(api('doa/verify-otp', 'v2'), {
//     email,
//     otp,
//   });
// };

// export const resetPassword = async (
//   email: string,
//   newPassword: string,
//   confirmPassword: string
// ) => {
//   return post<UserResetPasswordResponse, unknown>(api('doa/reset-password', 'v2'), {
//     email,
//     new_password: newPassword,
//     confirm_password: confirmPassword,
//   });
// };

// export const changePasswordFirstLogin = async (
//   email: string,
//   newPassword: string,
//   confirmPassword: string
// ) => {
//   return post<UserResetPasswordResponse, unknown>(api('doa/set-new-password', 'v2'), {
//     email,
//     new_password: newPassword,
//     confirm_password: confirmPassword,
//   });
// };

// export const acceptPdpaConsent = async (email: string, accepted: boolean) => {
//   return post<{ data: { message: string } }, unknown>(api('user/pdpa/accept', 'v1'), {
//     email,
//     accepted,
//   });
// };
