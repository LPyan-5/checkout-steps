import type { City, CartItem, DeliveryOption } from '@/lib/type';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartStore {
  items: CartItem[];
  cities: City[];
  selectedCity: City | null;
  selectedDelivery: DeliveryOption | null;
  currentStep: number;
  userInfo: {
    firstName: string;
    lastName: string;
    email: string;
  };
  removeItem: (id: number) => void;
  setItems: (data: CartItem[]) => void;
  setCities: (data: City[]) => void;
  setSelectedCity: (city: City) => void;
  setSelectedDelivery: (delivery: DeliveryOption) => void;
  setUserInfo: (info: { firstName: string; lastName: string; email: string }) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetCheckout: () => void;
  getTotalPrice: () => number;
  getFinalTotal: () => number;
}

export const useStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      cities: [],
      selectedCity: null,
      selectedDelivery: null,
      currentStep: 0,
      userInfo: {
        firstName: '',
        lastName: '',
        email: '',
      },
      setItems: (data) => set({ items: data }),
      setCities: (data) => set({ cities: data }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      setSelectedCity: (city) => set({ selectedCity: city, selectedDelivery: null }),
      setSelectedDelivery: (delivery) => set({ selectedDelivery: delivery }),
      setUserInfo: (info) => set({ userInfo: info }),
      setCurrentStep: (step) => set({ currentStep: Math.max(0, Math.min(step, 2)) }),
      nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 2) })),
      prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 0) })),
      resetCheckout: () =>
        set({
          currentStep: 0,
          selectedCity: null,
          selectedDelivery: null,
          userInfo: { firstName: '', lastName: '', email: '' },
        }),
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
    }),
    {
      name: 'checkout-storage',
      partialize: (state) => ({
        items: state.items,
        selectedCity: state.selectedCity,
        selectedDelivery: state.selectedDelivery,
        currentStep: state.currentStep,
        userInfo: state.userInfo,
      }),
    }
  )
);
