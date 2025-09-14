'use client';

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

  const itemsTotal = getTotalPrice();
  const deliveryPrice = selectedDelivery?.price || 0;
  const finalTotal = getFinalTotal();

  const handlePlaceOrder = () => {
    // Mock API request - in real app this would send data to backend
    console.log('Placing order:', {
      items,
      userInfo,
      city: selectedCity?.name,
      delivery: selectedDelivery,
      total: finalTotal,
    });

    alert('Order placed successfully! (This is a mock implementation)');
    onComplete();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
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

        <div>
          <h3 className="font-medium mb-2">Delivery Details</h3>
          <div className="text-sm text-gray-600 space-y-1">
            <p>City: {selectedCity?.name}</p>
            <p>Delivery: {selectedDelivery?.label}</p>
          </div>
        </div>

        <Separator />

        <div>
          <h3 className="font-medium mb-2">Order Summary</h3>
          <div className="space-y-2">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.name} × {item.quantity || 1}
                </span>
                <span>${(item.price * (item.quantity || 1)).toFixed(2)}</span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-sm">
              <span>Subtotal:</span>
              <span>${itemsTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Delivery:</span>
              <span>{deliveryPrice === 0 ? 'Free' : `$${deliveryPrice.toFixed(2)}`}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pt-4">
        <Button onClick={handlePlaceOrder} className="w-full bg-black text-white hover:bg-gray-800">
          Place Order
        </Button>
        <Button type="button" variant="ghost" onClick={onBack} className="w-full">
          Back to delivery
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
