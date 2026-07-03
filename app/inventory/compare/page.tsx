import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllCars } from "@/lib/data";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatPKR, formatKm, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Compare Vehicles",
  description: "Compare specifications and pricing of vehicles side-by-side at RS Motors.",
};

const rows: { label: string; get: (c: any) => string }[] = [
  { label: "Price", get: (c) => formatPKR(c.price) },
  { label: "Year", get: (c) => String(c.year) },
  { label: "Mileage", get: (c) => formatKm(c.mileageKm) },
  { label: "Fuel Type", get: (c) => c.fuelType },
  { label: "Transmission", get: (c) => c.transmission },
  { label: "Body Type", get: (c) => c.bodyType },
  { label: "Engine", get: (c) => (c.engineCC ? `${formatNumber(c.engineCC)} cc` : "—") },
  { label: "Color", get: (c) => c.color },
  { label: "Ownership", get: (c) => c.ownership },
  { label: "City", get: (c) => c.city },
  { label: "Inspection", get: (c) => c.inspection },
  { label: "Financing", get: (c) => (c.financeAvailable ? "Available" : "Not Available") },
];

export default async function ComparePage({
  searchParams,
}: {
  searchParams: Promise<{ ids?: string }>;
}) {
  const { ids } = await searchParams;
  const idList = ids ? ids.split(",") : [];
  const allCars = await getAllCars();
  const cars = idList.map((id) => allCars.find((c) => c.id === id)).filter(Boolean) as typeof allCars;

  return (
    <div className="container-px mx-auto max-w-6xl py-8">
      <Breadcrumbs items={[{ label: "Inventory", href: "/inventory" }, { label: "Compare" }]} />

      <h1 className="font-display text-3xl font-bold mt-4 mb-8">Compare Vehicles</h1>

      {cars.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground">No vehicles selected for comparison.</p>
          <Button asChild className="mt-4">
            <Link href="/inventory">Browse Inventory</Link>
          </Button>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="grid gap-4" style={{ gridTemplateColumns: `160px repeat(${cars.length}, 1fr)` }}>
              <div />
              {cars.map((car) => (
                <Card key={car.id} className="overflow-hidden">
                  <div className="relative h-32">
                    {car.images[0] && (
                      <Image src={car.images[0].url} alt={car.brand} fill className="object-cover" />
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-semibold text-sm line-clamp-1">{car.brand} {car.model}</p>
                    <Button asChild size="sm" variant="outline" className="w-full mt-2">
                      <Link href={`/inventory/${car.slug}`}>View</Link>
                    </Button>
                  </div>
                </Card>
              ))}

              {rows.map((row) => (
                <React.Fragment key={row.label}>
                  <div className="flex items-center text-sm font-medium text-muted-foreground py-3 border-t border-border">
                    {row.label}
                  </div>
                  {cars.map((car) => (
                    <div key={car.id + row.label} className="flex items-center text-sm py-3 border-t border-border">
                      {row.get(car)}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
