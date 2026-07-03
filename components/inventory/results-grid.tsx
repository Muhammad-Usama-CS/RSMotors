"use client";

import * as React from "react";
import { SearchX } from "lucide-react";
import { CarCard } from "@/components/shared/car-card";
import { QuickViewDialog } from "@/components/inventory/quick-view-dialog";
import type { CarT } from "@/lib/data";

export function ResultsGrid({ cars, view }: { cars: CarT[]; view: "grid" | "list" }) {
  const [quickViewCar, setQuickViewCar] = React.useState<CarT | null>(null);

  if (cars.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <SearchX className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="font-display text-lg font-semibold">No vehicles found</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          Try adjusting your filters or search criteria to find more results.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className={
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            : "flex flex-col gap-5"
        }
      >
        {cars.map((car) => (
          <CarCard key={car.id} car={car} view={view} onQuickView={setQuickViewCar} />
        ))}
      </div>
      <QuickViewDialog car={quickViewCar} onClose={() => setQuickViewCar(null)} />
    </>
  );
}
