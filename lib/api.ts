import type { CartItem, City, PlaceOrderPayload, UserInfo } from '@/lib/type';

import { cartItems, cities, mockUser } from '@/lib/data';

export async function fetchUserInfo(): Promise<UserInfo | null> {
  return new Promise((resolve) => {
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', 'mocked-token-123');
    }

    setTimeout(() => {
      const token = localStorage.getItem('token');

      if (token) {
        resolve(mockUser);
      } else {
        resolve(null);
      }
    }, 500);
  });
}

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

export async function fetchCities(): Promise<City[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(cities);
    }, 1000);
  });
}

export async function placeOrder(payload: PlaceOrderPayload) {
  return new Promise<{ success: boolean; orderId: string }>((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        orderId: `Order-${Math.floor(Math.random() * 100000)}`,
      });
    }, 1000);
  });
}
