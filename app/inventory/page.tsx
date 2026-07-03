import type { Metadata } from "next";
import { filterCars, getAllCars } from "@/lib/data";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { FiltersSidebar } from "@/components/inventory/filters-sidebar";
import { Toolbar } from "@/components/inventory/toolbar";
import { ResultsGrid } from "@/components/inventory/results-grid";
import { Pagination } from "@/components/inventory/pagination";
import { CompareBar } from "@/components/inventory/compare-bar";

export const metadata: Metadata = {
  title: "Browse Inventory",
  description:
    "Explore RS Motors' full inventory of verified new and used cars in Pakistan. Filter by brand, price, fuel type, transmission, and body type.",
  alternates: { canonical: "/inventory" },
};

interface PageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function InventoryPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const get = (k: string) => (typeof sp[k] === "string" ? (sp[k] as string) : undefined);

  const filters = {
    brand: get("brand"),
    model: get("model"),
    yearMin: get("yearMin") ? Number(get("yearMin")) : undefined,
    yearMax: get("yearMax") ? Number(get("yearMax")) : undefined,
    priceMin: get("priceMin") ? Number(get("priceMin")) : undefined,
    priceMax: get("priceMax") ? Number(get("priceMax")) : undefined,
    fuelType: get("fuelType"),
    transmission: get("transmission"),
    bodyType: get("bodyType"),
    city: get("city"),
    sort: get("sort"),
    page: get("page") ? Number(get("page")) : 1,
  };

  const { cars, total } = await filterCars(filters);
  const allCars = await getAllCars();
  const view = get("view") === "list" ? "list" : "grid";

  return (
    <div className="container-px mx-auto max-w-7xl py-8">
      <Breadcrumbs items={[{ label: "Inventory" }]} />

      <div className="mt-4 mb-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">Vehicle Inventory</h1>
        <p className="text-muted-foreground mt-2">
          Browse our full range of verified, inspected vehicles across Pakistan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="space-y-4">
          <FiltersSidebar />
        </aside>

        <div className="pb-20">
          <Toolbar total={total} />
          <ResultsGrid cars={cars} view={view} />
          <Pagination total={total} />
        </div>
      </div>

      <CompareBar allCars={allCars} />
    </div>
  );
}
