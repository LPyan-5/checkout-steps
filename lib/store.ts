import type { City, CartItem, DeliveryType } from '@/lib/type';

import { create } from 'zustand';

interface CartStore {
  items: CartItem[];
  selectedCity: City | null;
  selectedDelivery: DeliveryType | null;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  removeItem: (id: number) => void;
  setSelectedCity: (city: City) => void;
  setSelectedDelivery: (delivery: DeliveryType) => void;
  setUserInfo: (info: { firstName: string; lastName: string; email: string }) => void;
  getTotalPrice: () => number;
  getFinalTotal: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  selectedCity: null,
  selectedDelivery: null,
  userInfo: {
    firstName: '',
    lastName: '',
    email: '',
  },
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  setSelectedCity: (city) => set({ selectedCity: city, selectedDelivery: null }),
  setSelectedDelivery: (delivery) => set({ selectedDelivery: delivery }),
  setUserInfo: (info) => set({ userInfo: info }),
  getTotalPrice: () => {
    const state = get();

    return state.items.reduce((total, item) => total + item.price * (item.quantity || 1), 0);
  },
  getFinalTotal: () => {
    const state = get();
    const itemsTotal = state.getTotalPrice();
    const deliveryPrice = state.selectedDelivery?.price || 0;

    return itemsTotal + deliveryPrice;
  },
}));
