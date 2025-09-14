'use client';

import { useState } from 'react';
import { startCase } from 'lodash';
import { placeOrder } from '@/lib/api';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface SummaryStepProps {
  onBack: () => void;
  onComplete: () => void;
}

export const SummaryStep = ({ onBack, onComplete }: SummaryStepProps) => {
  const { items, userInfo, selectedCity, selectedDelivery, getTotalPrice, getFinalTotal } =
    useStore();

  const [loading, setLoading] = useState<boolean>(false);

  const itemsTotal = getTotalPrice();
  const deliveryPrice = selectedDelivery?.price || 0;
  const finalTotal = getFinalTotal();

  const handlePlaceOrder = async () => {
    setLoading(true);

    try {
      const response = await placeOrder({
        items,
        userInfo,
        city: selectedCity?.name ?? null,
        delivery: selectedDelivery,
        total: finalTotal,
      });

      if (response.success) {
        onComplete();
      }
    } catch (err) {
      alert('Something went wrong while placing your order.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Products</h3>

          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between space-x-4 py-2 bg-white rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <div className="w-14 h-14 bg-gray-300 rounded-lg overflow-hidden">
                  <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                </div>

                <div className="flex-1 min-w-0 gap-1">
                  <h3 className="font-medium text-sm truncate mb-2">{item.name}</h3>

                  <p className="text-xs text-gray-600">By: {item.manufacturer}</p>
                </div>
              </div>

              <p>{item.price}$</p>
            </div>
          ))}
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Customer Information</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>
              {userInfo.firstName} {userInfo.lastName}
            </p>

            <p>{userInfo.email}</p>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Products</span>
            <span>${parseFloat(itemsTotal.toFixed(2))}</span>
          </div>

          {selectedDelivery && selectedCity && (
            <div className="flex justify-between text-sm">
              <span>
                {startCase(selectedDelivery?.type)} delivery to {selectedCity?.name ?? ''}
              </span>

              <span>
                {deliveryPrice === 0 ? 'Free' : `$${parseFloat(deliveryPrice.toFixed(2))}`}
              </span>
            </div>
          )}

          <div className="flex justify-between font-medium text-lg">
            <span>Total:</span>

            <span>${finalTotal}</span>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <Button onClick={handlePlaceOrder} className="w-full bg-black text-white hover:bg-gray-800">
          {loading ? 'Processing...' : 'Place Order'}
        </Button>
        <Button type="button" variant="ghost" onClick={onBack} className="w-full">
          Back to delivery
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
