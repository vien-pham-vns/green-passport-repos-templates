import React from 'react';

// import { User } from '@/types/user';

import { AppLayoutClient } from './_components/app-layout-client';

// import ClientDataLoader from './_components/client-data-loader';

interface AppLayoutProps {
  // user: User;
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <>
      {/* <ClientDataLoader user={user} /> */}
      <AppLayoutClient>{children}</AppLayoutClient>
    </>
  );
}
