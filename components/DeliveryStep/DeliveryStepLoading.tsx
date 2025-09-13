import { Skeleton } from '@/components/ui/skeleton';

export function DeliveryStepLoading() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4 py-4">
        <Skeleton className="h-6 w-full" />
      </div>

      <div className="flex flex-row flex-nowrap justify-between items-center pt-6 gap-2">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-1/3 mb-2" />
        ))}
      </div>
    </div>
  );
}
