import React from 'react';

import AppLayout from '@/components/app-layout';

import { getCurrentUser } from '../actions/auth';

export default async function MainLayout({ children }: React.PropsWithChildren) {
  // const user = await getCurrentUser();

  return <AppLayout>{children}</AppLayout>;
}
