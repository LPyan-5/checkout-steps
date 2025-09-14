'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { fetchCartItems } from '@/lib/api';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/Cart/CartItem';
import { CartLoading } from '@/components/Cart/CartLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CartPage = () => {
  const { items, setItems, removeItem } = useStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const totalPrice = useMemo(() => {
    const total = items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    return total.toFixed(2);
  }, [items]);

  useEffect(() => {
    if (!items.length) {
      setError(null);
      fetchCartItems()
        .then((data) => setItems(data))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [items.length, setItems]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md ">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-left">Cart</CardTitle>
        </CardHeader>

        {loading ? (
          <CartLoading />
        ) : error ? (
          <div className="flex flex-col items-center gap-4 text-center py-8 text-red-500">
            {error}

            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        ) : !items.length ? (
          <div className="flex items-center justify-center text-center py-8 text-gray-500">
            Your cart is empty.
          </div>
        ) : (
          <CardContent className="flex flex-col h-full p-4 pt-0">
            <div className="flex-1 min-h-[300px]">
              {items.map((item) => (
                <CartItem key={item.id} item={item} removeItem={removeItem} />
              ))}
            </div>

            <div className="pt-4 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="font-medium">Total:</span>

                <span className="font-bold">{totalPrice}$</span>
              </div>

              <Button
                className="w-full bg-black text-white hover:bg-gray-800"
                onClick={() => router.push('/checkout')}
              >
                Go to checkout
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

export default CartPage;
