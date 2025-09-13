import { Skeleton } from '@/components/ui/skeleton';

export function CartPageLoading() {
  return (
    <>
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 py-4 border-b">
          <Skeleton className="w-16 h-16 rounded-lg" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="w-8 h-8 rounded-full" />
        </div>
      ))}

      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-2 w-1/4" />
      </div>
    </>
  );
}
