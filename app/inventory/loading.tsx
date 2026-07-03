import { CarCardSkeleton } from "@/components/shared/car-card-skeleton";

export default function Loading() {
  return (
    <div className="container-px mx-auto max-w-7xl py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <div className="hidden lg:block h-96 rounded-2xl bg-muted animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <CarCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
