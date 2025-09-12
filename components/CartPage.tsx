'use client';

import { useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { cartItems } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CartPageProps {
  onCheckout: () => void;
}

export function CartPage({ onCheckout }: CartPageProps) {
  const { items, removeItem } = useCartStore();

  // Initialize cart items on mount
  useEffect(() => {
    if (items.length === 0) {
      useCartStore.setState({ items: cartItems });
    }
  }, [items.length]);

  const totalPrice = items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-left">Cart</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 py-4 bg-white rounded-lg border-b">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 gap-1">
                    <h3 className="font-medium text-sm truncate mb-2">
                      {item.name} - {item.price}$
                    </h3>
                    <p className="text-xs text-gray-600">By: {item.manufacturer}</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                    className="bg-gray-200 border border-gray-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <div className="pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">{totalPrice.toFixed(2)}$</span>
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