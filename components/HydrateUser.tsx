'use client';

import { useEffect } from 'react';
import { useStore } from '@/lib/store';
import { fetchUserInfo } from '@/lib/api';

export default function HydrateUser() {
  const { userInfo, setUserInfo } = useStore();

  useEffect(() => {
    if (!userInfo?.firstName) {
      fetchUserInfo().then((user) => {
        if (user) setUserInfo(user);
      });
    }
  }, [setUserInfo, userInfo]);

  return null;
}
