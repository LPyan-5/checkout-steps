'use client';

import { useEffect, useMemo, useState } from 'react';
import { fetchCartItems } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { CartItem } from '@/components/CardPage/CardItem';
import { CartPageLoading } from '@/components/CardPage/CartPageLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartPageProps {
  onCheckout: () => void;
}

export function CartPage({ onCheckout }: CartPageProps) {
  const { items, removeItem } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = useMemo(() => {
    const totalPrice = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

    return totalPrice.toFixed(2);
  }, [items]);

  useEffect(() => {
    if (!items.length) {
      setError(null);

      fetchCartItems()
        .then((data) => {
          useCartStore.setState({ items: data });
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [items.length]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md min-h-[450px]">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-left">Cart</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 flex flex-col">
          {loading ? (
            <CartPageLoading />
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
            <>
              {items.map((item) => (
                <CartItem key={item.id} item={item} removeItem={removeItem} />
              ))}
              <div className="pt-4 mt-auto">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">{totalPrice}$</span>
                </div>
                <Button
                  onClick={onCheckout}
                  className="w-full bg-black text-white hover:bg-gray-800"
                >
                  Go to checkout
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
