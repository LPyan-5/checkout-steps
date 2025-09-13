'use client';

import type { City, DeliveryType } from '@/lib/type';

import { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { cities } from '@/lib/data';
import { useCartStore } from '@/lib/store';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from '@/components/ui/select';

interface DeliveryStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function DeliveryStep({ onNext, onBack }: DeliveryStepProps) {
  const { selectedCity, selectedDelivery, setSelectedCity, setSelectedDelivery } = useCartStore();
  const [currentCity, setCurrentCity] = useState<City | null>(selectedCity);
  const [currentDelivery, setCurrentDelivery] = useState<string>(selectedDelivery?.type || '');

  const form = useForm({
    defaultValues: {
      cityId: selectedCity?.id.toString() || '',
      deliveryType: selectedDelivery?.type || '',
    },
    onSubmit: async ({ value }) => {
      if (!currentCity || !currentDelivery) return;

      const deliveryPrice =
        currentCity.delivery[currentDelivery as keyof typeof currentCity.delivery] || 0;
      const deliveryOption: DeliveryType = {
        type: currentDelivery as 'fast' | 'regular' | 'slow',
        price: deliveryPrice,
        label: `${currentDelivery.charAt(0).toUpperCase() + currentDelivery.slice(1)} - ${deliveryPrice === 0 ? 'Free' : `$${deliveryPrice}`}`,
      };

      setSelectedCity(currentCity);
      setSelectedDelivery(deliveryOption);
      onNext();
    },
  });

  const handleCityChange = (cityId: string) => {
    const city = cities.find((c) => c.id.toString() === cityId);
    if (city) {
      setCurrentCity(city);
      setCurrentDelivery('');
      form.setFieldValue('cityId', cityId);
      form.setFieldValue('deliveryType', '');
    }
  };

  const handleDeliveryChange = (deliveryType: string) => {
    setCurrentDelivery(deliveryType);
    form.setFieldValue('deliveryType', deliveryType);
  };

  const getAvailableDeliveryOptions = () => {
    if (!currentCity) return [];

    const options = [];
    if (currentCity.delivery.fast !== null) {
      options.push({
        type: 'fast',
        price: currentCity.delivery.fast,
        label: `Fast - $${currentCity.delivery.fast}`,
      });
    }
    if (currentCity.delivery.regular !== null) {
      options.push({
        type: 'regular',
        price: currentCity.delivery.regular,
        label: `Regular - $${currentCity.delivery.regular}`,
      });
    }
    if (currentCity.delivery.slow !== null) {
      options.push({
        type: 'slow',
        price: currentCity.delivery.slow,
        label:
          currentCity.delivery.slow === 0 ? 'Slow - Free' : `Slow - $${currentCity.delivery.slow}`,
      });
    }
    return options;
  };

  const canSubmit = currentCity && currentDelivery;

  return (
    <div className="space-y-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-6"
      >
        <div className="space-y-2">
          <Label>City</Label>
          <Select onValueChange={handleCityChange} value={currentCity?.id.toString() || ''}>
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {cities.map((city) => (
                <SelectItem key={city.id} value={city.id.toString()}>
                  {city.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentCity && (
          <div className="space-y-3">
            <Label>Delivery type</Label>
            <RadioGroup
              value={currentDelivery}
              onValueChange={handleDeliveryChange}
              className="space-y-3"
            >
              {getAvailableDeliveryOptions().map((option) => (
                <div key={option.type} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.type} id={option.type} />
                  <Label htmlFor={option.type} className="cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        <div className="space-y-3 pt-4">
          <Button
            type="submit"
            disabled={!canSubmit}
            className="w-full bg-black text-white hover:bg-gray-800 disabled:opacity-50"
          >
            To summary
          </Button>
          <Button type="button" variant="ghost" onClick={onBack} className="w-full">
            Back to information
          </Button>
        </div>
      </form>
    </div>
  );
}
