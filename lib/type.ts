import { ReactElement } from 'react';

export type CartItem = {
  id: number;
  name: string;
  manufacturer: string;
  price: number;
  imageUrl: string;
  quantity?: number;
};

export type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
};

export type City = {
  id: number;
  name: string;
  delivery: {
    fast: number | null;
    regular: number | null;
    slow: number | null;
  };
};

export enum DeliveryTypes {
  Fast = 'fast',
  Regular = 'regular',
  Slow = 'slow',
}

export type DeliveryOption = {
  type: DeliveryTypes;
  price: number;
  disabled: boolean;
  label: ReactElement;
};
