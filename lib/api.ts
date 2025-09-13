import type { CartItem } from '@/lib/type';

import { cartItems } from '@/lib/data';

export async function fetchCartItems(): Promise<CartItem[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < 0.05) {
        reject(new Error('Failed to load cart items. Please try again.'));
      } else {
        resolve(cartItems);
      }
    }, 1000);
  });
}
