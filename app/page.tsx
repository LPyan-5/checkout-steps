'use client';

import { useEffect, useState } from 'react';
import { fetchUserInfo } from '@/lib/api';
import { useCartStore } from '@/lib/store';
import { CartPage } from '@/components/CardPage/CartPage';
import { CheckoutPage } from '@/components/CheckoutPage/CheckoutPage';

type AppState = 'cart' | 'checkout' | 'complete';

export default function Home() {
  const [appState, setAppState] = useState<AppState>('cart');

  const { setUserInfo } = useCartStore();

  const handleCheckout = () => {
    setAppState('checkout');
  };

  const handleBackToCart = () => {
    setAppState('cart');
  };

  const handleOrderComplete = () => {
    setAppState('complete');
  };

  const handleNewOrder = () => {
    setAppState('cart');
  };

  useEffect(() => {
    fetchUserInfo().then((user) => {
      if (user) setUserInfo(user);
    });
  }, [setUserInfo]);

  if (appState === 'complete') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 ">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-green-600">Order Completed!</h1>
          <p className="text-gray-600">Thank you for your purchase.</p>
          <button
            onClick={handleNewOrder}
            className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            Start New Order
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/75">
      {appState === 'cart' && <CartPage onCheckout={handleCheckout} />}

      {appState === 'checkout' && (
        <CheckoutPage onBackToCart={handleBackToCart} onOrderComplete={handleOrderComplete} />
      )}
    </div>
  );
}
