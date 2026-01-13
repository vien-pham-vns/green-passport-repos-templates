import { redirect } from 'next/navigation';
import React from 'react';

import AuthFooter from '@/components/auth-layout/auth-footer';
import { AuthFormTitle } from '@/components/auth-layout/auth-form-title';
import { AuthLayout } from '@/components/auth-layout/auth-layout';
import { getAuthToken } from '@/lib/auth';

// import { fetchMe } from '@/utils/server-api';

export default async function LoginLayout({ children }: React.PropsWithChildren) {
  const token = await getAuthToken();

  if (token) {
    // const user = await fetchMe();
    // if (user) {
    // redirect('/');
    // }
    redirect('/portal');
  }

  return (
    <AuthLayout logo={null} footer={<AuthFooter />} header={<AuthFormTitle />}>
      {children}
    </AuthLayout>
  );
}
