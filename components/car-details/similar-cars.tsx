import { CarCard } from "@/components/shared/car-card";
import type { CarT } from "@/lib/data";

export function SimilarCars({ cars }: { cars: CarT[] }) {
  if (cars.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-display text-2xl font-bold mb-6">Similar Vehicles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cars.map((car) => (
          <CarCard key={car.id} car={car} />
        ))}
      </div>
    </section>
  );
}
