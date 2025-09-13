import type { CartItem } from '@/lib/type';

import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CartItemProps {
  item: CartItem;
  removeItem: (id: number) => void;
}

export function CartItem({ item, removeItem }: CartItemProps) {
  return (
    <div className="flex items-center space-x-4 py-4 bg-white rounded-lg border-b">
      <div className="w-16 h-16 bg-gray-300 rounded-lg overflow-hidden">
        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
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
  );
}
