'use client';

import type { FormEvent } from 'react';
import type { City, DeliveryOption } from '@/lib/type';

import { startCase } from 'lodash';
import { useForm } from '@tanstack/react-form';
import { useCallback, useMemo, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { fetchCities } from '@/lib/api';
import { DeliveryTypes } from '@/lib/type';
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
import { DeliveryStepLoading } from '@/components/DeliveryStep/DeliveryStepLoading';

interface DeliveryStepProps {
  onNext: () => void;
  onBack: () => void;
}

export function DeliveryStep({ onNext, onBack }: DeliveryStepProps) {
  const {
    cities,
    setCities,
    selectedCity,
    selectedDelivery,
    setSelectedCity,
    setSelectedDelivery,
  } = useCartStore();

  const [currentCity, setCurrentCity] = useState<City | null>(selectedCity);
  const [currentDelivery, setCurrentDelivery] = useState<string>(selectedDelivery?.type || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      cityId: selectedCity?.id.toString() || '',
      deliveryType: selectedDelivery?.type || '',
    },
    onSubmit: async ({ value }) => {
      const city = cities.find((c) => c.id.toString() === value.cityId);
      const type = value.deliveryType as DeliveryTypes;

      if (!city || !type) return;

      const price = city.delivery[type] ?? 0;
      const deliveryOption: DeliveryOption = {
        type,
        price,
        disabled: city.delivery[type] === null,
        label: <span>{`${startCase(type)} - ${!price ? 'Free' : `$${price}`}`}</span>,
      };

      setSelectedCity(city);
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

  const deliveryOptions: DeliveryOption[] = useMemo(() => {
    if (!currentCity) return [];

    return Object.values(DeliveryTypes).map((type) => {
      const price = currentCity.delivery[type];
      const isDisabled = price === null;

      const labelText =
        price === 0
          ? `${startCase(type)} - Free`
          : isDisabled
            ? `${startCase(type)}`
            : `${startCase(type)} - $${price}`;

      return {
        type,
        price: price ?? 0,
        disabled: isDisabled,
        label: <span>{labelText}</span>,
      };
    });
  }, [currentCity]);

  const canSubmit = useMemo(() => currentCity && currentDelivery, [currentCity, currentDelivery]);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      await form.handleSubmit();
    },
    [form]
  );

  useEffect(() => {
    if (!cities.length) {
      setError(null);

      fetchCities()
        .then((data) => {
          setCities(data);
        })
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [cities.length, setCities]);

  if (loading) return <DeliveryStepLoading />;
  if (error)
    return (
      <div className="flex flex-col items-center gap-4 text-center py-8 text-red-500">
        {error}

        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
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
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              {deliveryOptions.map((option) => (
                <div key={option.type} className="relative">
                  <RadioGroupItem value={option.type} id={option.type} className="peer sr-only" />

                  <Label
                    htmlFor={option.type}
                    className={cn(
                      'flex flex-col items-center justify-center outline p-2 rounded-lg cursor-pointer transition-all duration-100',
                      'hover:outline-gray-300',
                      option.disabled ? 'cursor-not-allowed pointer-events-none opacity-60' : '',
                      currentDelivery === option.type
                        ? 'outline-0 bg-black text-white'
                        : 'outline-gray-100 bg-gray-100 text-gray-700'
                    )}
                  >
                    <span className={`text-sm ${option.disabled ? 'line-through' : ''}`}>
                      {option.label}
                    </span>
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
