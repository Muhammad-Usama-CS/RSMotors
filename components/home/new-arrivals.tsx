import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getNewArrivals } from "@/lib/data";
import { CarCard } from "@/components/shared/car-card";
import { SectionHeading } from "./section-heading";
import { Button } from "@/components/ui/button";

export async function NewArrivals() {
  const cars = await getNewArrivals(8);

  return (
    <section className="section-y bg-secondary/40 dark:bg-black/20">
      <div className="container-px mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-2">
          <SectionHeading
            eyebrow="Just Arrived"
            title="New Arrivals"
            description="Fresh listings added to our inventory this week."
            align="left"
            className="mb-0"
          />
          <Button asChild variant="outline" className="shrink-0">
            <Link href="/inventory">
              Browse All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 flex gap-5 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
          {cars.map((car) => (
            <div key={car.id} className="min-w-[280px] sm:min-w-[320px] snap-start">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
