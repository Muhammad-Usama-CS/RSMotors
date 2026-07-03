import { Card } from "@/components/ui/card";
import { formatKm, formatNumber } from "@/lib/utils";
import type { CarT } from "@/lib/data";

export function SpecsTable({ car }: { car: CarT }) {
  const specs = [
    { label: "Brand", value: car.brand },
    { label: "Model", value: car.model },
    { label: "Variant", value: car.variant || "—" },
    { label: "Year", value: String(car.year) },
    { label: "Mileage", value: formatKm(car.mileageKm) },
    { label: "Fuel Type", value: car.fuelType },
    { label: "Transmission", value: car.transmission },
    { label: "Body Type", value: car.bodyType },
    { label: "Engine", value: car.engineCC ? `${formatNumber(car.engineCC)} cc` : "—" },
    { label: "Color", value: car.color },
    { label: "Ownership", value: car.ownership },
    { label: "Registered City", value: car.registeredCity || car.city },
  ];

  return (
    <Card className="p-6">
      <h3 className="font-display font-semibold text-lg mb-4">Specifications</h3>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
        {specs.map((s) => (
          <div key={s.label} className="flex justify-between border-b border-border/60 pb-2 text-sm">
            <dt className="text-muted-foreground">{s.label}</dt>
            <dd className="font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
