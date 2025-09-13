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

export type DeliveryType = {
  type: 'fast' | 'regular' | 'slow';
  price: number;
  label: string;
};
