'use client';

import { useEffect, useEffectEvent } from 'react';

import { identifyUser } from '@/lib/analytics-sync';
import useUserStore from '@/store/use-user-store';
import { User } from '@/types/user';

export default function ClientDataLoader({ user }: { user: User | null }) {
  return (
    <>
      <InitUserIdentity user={user} />
      <ClientFetchInit />
    </>
  );
}

function InitUserIdentity({ user }: { user: User | null }) {
  const onIdentityUser = useEffectEvent(() => {
    if (user) {
      useUserStore.getState().setUser(user);
      identifyUser(user);
    }
  });

  useEffect(() => {
    onIdentityUser();
  }, [user]);

  return null;
}

function ClientFetchInit() {
  // useFeatureFlagsQuery({
  //   enabled: true,
  // });

  // useProvinceLicensePlateQuery({
  //   enabled: true,
  // });

  return null;
}
