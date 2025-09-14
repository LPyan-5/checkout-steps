'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { fetchCartItems } from '@/lib/api';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/Cart/CartItem';
import { CartLoading } from '@/components/Cart/CartLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CompletePage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md ">Success</Card>
    </div>
  );
};

export default CompletePage;
