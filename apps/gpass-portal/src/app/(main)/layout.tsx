import { redirect } from 'next/navigation';
import React from 'react';

// import AppLayout from '@/components/app-layout';
import { getAuthToken } from '@/lib/auth';

// import { getCurrentUser } from '../actions/auth';

export default async function MainLayout({ children }: React.PropsWithChildren) {
  // const user = await getCurrentUser();
  const token = await getAuthToken();

  if (!token) {
    redirect('/login');
  }

  return <>{children}</>;
}
