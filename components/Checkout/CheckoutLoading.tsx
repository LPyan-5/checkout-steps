import { Skeleton } from '@/components/ui/skeleton';
import { CheckoutSteps } from '@/components/Checkout/CheckoutSteps';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CheckoutLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md min-h-[400px]">
        <CardHeader className="pb-0 gap-3">
          <CardTitle className="text-3xl font-bold text-left">Checkout</CardTitle>

          <CheckoutSteps />
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
