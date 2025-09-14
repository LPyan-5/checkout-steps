'use client';

import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { useHydratedStore } from '@/hooks/useHydratedStore';
import { CheckoutSteps } from '@/components/Checkout/CheckoutSteps';
import { CheckoutLoading } from '@/components/Checkout/CheckoutLoading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DeliveryStep, InformationStep, SummaryStep } from '@/components/Checkout/Steps';

export default function CheckoutPage() {
  const router = useRouter();
  const { currentStep, nextStep, prevStep, resetCheckout } = useStore();
  const hydrated = useHydratedStore();

  const handleNext = () => {
    nextStep();
  };

  const handleBack = () => {
    if (currentStep === 0) {
      router.push('/cart');
      localStorage.removeItem('checkout-storage');
    } else {
      prevStep();
    }
  };

  const handleOrderComplete = () => {
    resetCheckout();

    router.push('/complete');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <InformationStep onNext={handleNext} onBack={handleBack} />;
      case 1:
        return <DeliveryStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <SummaryStep onBack={handleBack} onComplete={handleOrderComplete} />;
      default:
        return null;
    }
  };

  if (!hydrated) return <CheckoutLoading />;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-0 gap-3">
          <CardTitle className="text-3xl font-bold text-left">Checkout</CardTitle>

          <CheckoutSteps />
        </CardHeader>
        <CardContent>{renderStep()}</CardContent>
      </Card>
    </div>
  );
}
