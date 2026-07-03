import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedCars } from "@/lib/data";
import { CarCard } from "@/components/shared/car-card";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";

export async function FeaturedCars() {
  const cars = await getFeaturedCars(6);

  return (
    <section className="section-y container-px mx-auto max-w-7xl">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
        <SectionHeading
          eyebrow="Handpicked Selection"
          title="Featured Vehicles"
          description="Our top-inspected, most-loved vehicles ready for their new owners."
          align="left"
          className="mb-0"
        />
        <Button asChild variant="outline" className="shrink-0">
          <Link href="/inventory">
            View All Inventory <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {cars.map((car, i) => (
          <CarCard key={car.id} car={car} priority={i < 3} />
        ))}
      </div>
    </section>
  );
}
