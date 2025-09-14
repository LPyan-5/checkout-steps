'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { fetchUserInfo } from '@/lib/api';

export default function HydrateUser() {
  const setUserInfo = useStore((s) => s.setUserInfo);

  useEffect(() => {
    fetchUserInfo().then((user) => {
      if (user) setUserInfo(user);
    });
  }, [setUserInfo]);

  return null;
}
