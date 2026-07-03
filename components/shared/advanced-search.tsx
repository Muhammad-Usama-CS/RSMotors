"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BRANDS, FUEL_TYPES, TRANSMISSIONS, BODY_TYPES, YEARS, PRICE_RANGES } from "@/lib/constants";

export function AdvancedSearch() {
  const router = useRouter();
  const [filters, setFilters] = React.useState<Record<string, string>>({});

  function set(key: string, value: string) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  function handleSearch() {
    const params = new URLSearchParams();
    if (filters.brand) params.set("brand", filters.brand);
    if (filters.year) params.set("yearMin", filters.year);
    if (filters.priceRange) {
      const range = PRICE_RANGES.find((r) => r.label === filters.priceRange);
      if (range) {
        params.set("priceMin", String(range.min));
        params.set("priceMax", String(range.max));
      }
    }
    if (filters.fuelType) params.set("fuelType", filters.fuelType);
    if (filters.transmission) params.set("transmission", filters.transmission);
    if (filters.bodyType) params.set("bodyType", filters.bodyType);
    router.push(`/inventory?${params.toString()}`);
  }

  return (
    <div className="glass rounded-2xl p-4 sm:p-5 shadow-2xl shadow-black/10 w-full max-w-4xl">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Select onValueChange={(v) => set("brand", v)}>
          <SelectTrigger className="bg-white/70 dark:bg-black/30"><SelectValue placeholder="Brand" /></SelectTrigger>
          <SelectContent>
            {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => set("year", v)}>
          <SelectTrigger className="bg-white/70 dark:bg-black/30"><SelectValue placeholder="Year" /></SelectTrigger>
          <SelectContent>
            {YEARS.slice(0, 15).map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => set("priceRange", v)}>
          <SelectTrigger className="bg-white/70 dark:bg-black/30"><SelectValue placeholder="Price Range" /></SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((r) => <SelectItem key={r.label} value={r.label}>{r.label}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => set("fuelType", v)}>
          <SelectTrigger className="bg-white/70 dark:bg-black/30"><SelectValue placeholder="Fuel Type" /></SelectTrigger>
          <SelectContent>
            {FUEL_TYPES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => set("transmission", v)}>
          <SelectTrigger className="bg-white/70 dark:bg-black/30"><SelectValue placeholder="Transmission" /></SelectTrigger>
          <SelectContent>
            {TRANSMISSIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select onValueChange={(v) => set("bodyType", v)}>
          <SelectTrigger className="bg-white/70 dark:bg-black/30"><SelectValue placeholder="Body Type" /></SelectTrigger>
          <SelectContent>
            {BODY_TYPES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={handleSearch} size="lg" className="mt-4 w-full gap-2">
        <Search className="h-4 w-4" />
        Search {Object.keys(filters).length > 0 ? "Vehicles" : "All Inventory"}
      </Button>
    </div>
  );
}
