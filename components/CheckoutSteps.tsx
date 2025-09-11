'use client';

import { cn } from '@/lib/utils';

interface CheckoutStepsProps {
  currentStep: number;
}

const steps = ['Information', 'Delivery', 'Summary'];

export function CheckoutSteps({ currentStep }: CheckoutStepsProps) {
  return (
    <div className="flex justify-center space-x-8 mb-8">
      {steps.map((step, index) => (
        <div
          key={step}
          className={cn(
            "text-sm font-medium pb-2 border-b-2 transition-colors",
            index === currentStep
              ? "text-black border-black"
              : index < currentStep
              ? "text-green-600 border-green-600"
              : "text-gray-400 border-transparent"
          )}
        >
          {step}
        </div>
      ))}
    </div>
  );
}