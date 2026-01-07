export const AppConfig = {
  DEPLOYMENT_ENV: process.env.DEPLOYMENT_ENV,

  POSTHOG_KEY: process.env.POSTHOG_KEY,
  POSTHOG_HOST: process.env.POSTHOG_HOST,

  BASE_PATH: '/portal',
  LOCAL_DEV: process.env.NEXT_PUBLIC_LOCAL_DEV === 'true',
} as const;
