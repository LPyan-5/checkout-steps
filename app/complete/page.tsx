'use client';

import { useStore } from '@/lib/store';
import {useRouter} from "next/navigation";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';

const CompletePage = () => {
  const router = useRouter();

  const { resetCheckout } = useStore();

  const handleBackToCart = () => {
    router.push('/cart');

    localStorage.removeItem('checkout-storage');

    resetCheckout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-5">
      <Card className="flex flex-col w-full max-w-md pt-10 gap-10 min-w-[560px]">
        <CardTitle className="text-3xl font-bold text-center ">Success!</CardTitle>

        <CardContent>
          <Button
            className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50"
            onClick={handleBackToCart}
          >
            Back to cart
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompletePage;
