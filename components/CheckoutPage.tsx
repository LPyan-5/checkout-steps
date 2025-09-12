'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SummaryStep } from './SummaryStep';
import { DeliveryStep } from './DeliveryStep';
import { CheckoutSteps } from './CheckoutSteps';
import { InformationStep } from './InformationStep';

interface CheckoutPageProps {
  onBackToCart: () => void;
  onOrderComplete: () => void;
}

export function CheckoutPage({ onBackToCart, onOrderComplete }: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 2));
  };

  const handleBack = () => {
    if (currentStep === 0) {
      onBackToCart();
    } else {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InformationStep onNext={handleNext} onBack={handleBack} />;
      case 1:
        return <DeliveryStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <SummaryStep onBack={handleBack} onComplete={onOrderComplete} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-0 gap-3">
          <CardTitle className="text-3xl font-bold text-left">Checkout</CardTitle>
          <CheckoutSteps currentStep={currentStep} />
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>
    </div>
  );
}