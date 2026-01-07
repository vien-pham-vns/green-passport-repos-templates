// import { AppConfig } from 'app-config';
// import { redirectToLogin } from 'app/actions/auth';
// import axios, {
//   AxiosRequestConfig,
//   AxiosResponse,
//   InternalAxiosRequestConfig,
// } from 'axios';
// import { NEXT_LOCALE } from 'constant';
// import { getCookie } from 'utils/cookie-client';
// import { captureApiError } from 'utils/posthog';
// import { clearFirstLoginState, getBearerToken, removeBearerToken } from 'utils/storage';
// import { showToast } from 'utils/toast';
// import { toCamel, toSnake } from 'utils/transform';

// const apiClient = axios.create({
//   baseURL: AppConfig.API_DOMAIN,
//   timeout: 30000, // Request timeout in milliseconds
//   withCredentials: true, // Include cookies in requests
//   headers: {
//     'Content-Type': 'application/json',
//     Accept: 'application/json',
//   },
// });

// apiClient.interceptors.request.use(
//   (config: InternalAxiosRequestConfig) => {
//     // START: TEMP for localhost dev convenience
//     /**
//      * Attach Bearer token for authentication only for LOCAL_DEV environment
//      * In production, stating, development (deployment env), authentication is handled via cookies (HttpOnly)
//      * This is to prevent CSRF attacks while still allowing local dev convenience
//      * See https://owasp.org/www-community/attacks/csrf for more details
//      */
//     if (AppConfig.LOCAL_DEV) {
//       const token = getBearerToken();
//       if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//       }
//     }
//     // END

//     const csrfCookie = getCookie('__csrf');
//     if (csrfCookie) {
//       config.headers['X-CSRF-Token'] = csrfCookie;
//     }

//     const locale = getCookie(NEXT_LOCALE);
//     if (locale) {
//       config.headers['X-app-language'] = locale;
//     }

//     config.headers['X-source-channel'] = AppConfig.BASE_PATH;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Flag to prevent multiple simultaneous redirects
// let isRedirecting = false;

// // Throttle 503 error toasts to prevent spam (max 1 per 5 seconds)
// let last503ToastTime = 0;
// const TOAST_THROTTLE_MS = 5000;

// // Endpoints that should not trigger auto-redirect on 401/403
// // These are public/unauthenticated flows where 401 is expected
// const SKIP_REDIRECT_ENDPOINTS = [
//   '/doa/verify-otp',
//   '/doa/request-reset-password',
//   '/doa/reset-password',
//   '/user/login',
// ];

// apiClient.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response;
//   },
//   async (error) => {
//     const status = error?.response?.status;
//     const requestUrl = error?.config?.url || '';

//     // Handle 401 Unauthorized - Clear all auth state and redirect immediately
//     // EXCEPT for public endpoints where 401 is expected (login, forgot password, etc)
//     if (status === 401 || status === 403) {
//       // Skip redirect for public/unauthenticated endpoints
//       const shouldSkipRedirect = SKIP_REDIRECT_ENDPOINTS.some((endpoint) =>
//         requestUrl.includes(endpoint)
//       );

//       if (shouldSkipRedirect) {
//         return Promise.reject(error);
//       }

//       // Prevent multiple redirects
//       if (isRedirecting) {
//         return Promise.reject(error);
//       }
//       isRedirecting = true;

//       // Clear all authentication-related state
//       if (AppConfig.LOCAL_DEV) {
//         removeBearerToken();
//       }

//       clearFirstLoginState();
//       await redirectToLogin();

//       return Promise.reject(error);
//     }

//     // Handle 503 Service Unavailable with throttled toast
//     if (status === 503) {
//       const now = Date.now();
//       if (now - last503ToastTime > TOAST_THROTTLE_MS) {
//         showToast('Service temporarily unavailable. Please try again later.', 'error');
//         last503ToastTime = now;
//       }
//       captureApiError(error);
//       return Promise.reject(error);
//     }

//     // Capture all other errors
//     captureApiError(error);

//     return Promise.reject(error);
//   }
// );

// const call = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
//   const response = await apiClient.request<T>({
//     url: endpoint,
//     ...config,
//     data: toSnake(config?.data || {}),
//     params: toSnake(config?.params || {}),
//   });
//   // For text responses (like CSV), return raw data without transformation
//   if (config?.responseType === 'text') {
//     return response.data as T;
//   }
//   return toCamel({ ...response.data }) as T;
// };

// export const get = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> =>
//   call<T>(endpoint, { ...config, method: 'GET' });

// export const post = async <T, G>(
//   endpoint: string,
//   data?: G,
//   config?: AxiosRequestConfig
// ): Promise<T> => call<T>(endpoint, { ...config, method: 'POST', data });

// export const patch = async <T, G>(
//   endpoint: string,
//   data?: G,
//   config?: AxiosRequestConfig
// ): Promise<T> => call<T>(endpoint, { ...config, method: 'PATCH', data });

// export const put = async <T, G>(
//   endpoint: string,
//   data?: G,
//   config?: AxiosRequestConfig
// ): Promise<T> => call<T>(endpoint, { ...config, method: 'PUT', data });

// export const remove = async <T>(
//   endpoint: string,
//   config?: AxiosRequestConfig
// ): Promise<T> => call<T>(endpoint, { ...config, method: 'DELETE' });
