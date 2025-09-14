import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';

export function useHydratedStore() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const unsub = useStore.persist?.onHydrate(() => {
      setHydrated(true);
    });

    setTimeout(() => setHydrated(true), 0);

    return () => unsub?.();
  }, []);

  return hydrated;
}
