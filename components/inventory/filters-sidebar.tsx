"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Sheet } from "@/components/inventory/sheet";
import { BRANDS, FUEL_TYPES, TRANSMISSIONS, BODY_TYPES, CITIES } from "@/lib/constants";
import { formatPKR } from "@/lib/utils";

export function FiltersSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    Number(searchParams.get("priceMin")) || 0,
    Number(searchParams.get("priceMax")) || 40000000,
  ]);

  function updateParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    params.delete("page");
    router.push(`/inventory?${params.toString()}`);
  }

  function applyPriceRange() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("priceMin", String(priceRange[0]));
    params.set("priceMax", String(priceRange[1]));
    params.delete("page");
    router.push(`/inventory?${params.toString()}`);
  }

  function clearAll() {
    router.push("/inventory");
    setPriceRange([0, 40000000]);
  }

  const activeCount = Array.from(searchParams.keys()).filter(
    (k) => !["sort", "view", "page"].includes(k)
  ).length;

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display font-semibold text-lg">Filters</h3>
        {activeCount > 0 && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-xs h-7 text-primary">
            Clear all
          </Button>
        )}
      </div>

      <div className="space-y-2">
        <Label>Brand</Label>
        <Select value={searchParams.get("brand") || undefined} onValueChange={(v) => updateParam("brand", v)}>
          <SelectTrigger><SelectValue placeholder="All Brands" /></SelectTrigger>
          <SelectContent>
            {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Body Type</Label>
        <Select value={searchParams.get("bodyType") || undefined} onValueChange={(v) => updateParam("bodyType", v)}>
          <SelectTrigger><SelectValue placeholder="All Body Types" /></SelectTrigger>
          <SelectContent>
            {BODY_TYPES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Fuel Type</Label>
        <Select value={searchParams.get("fuelType") || undefined} onValueChange={(v) => updateParam("fuelType", v)}>
          <SelectTrigger><SelectValue placeholder="Any Fuel Type" /></SelectTrigger>
          <SelectContent>
            {FUEL_TYPES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Transmission</Label>
        <Select value={searchParams.get("transmission") || undefined} onValueChange={(v) => updateParam("transmission", v)}>
          <SelectTrigger><SelectValue placeholder="Any Transmission" /></SelectTrigger>
          <SelectContent>
            {TRANSMISSIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>City</Label>
        <Select value={searchParams.get("city") || undefined} onValueChange={(v) => updateParam("city", v)}>
          <SelectTrigger><SelectValue placeholder="All Cities" /></SelectTrigger>
          <SelectContent>
            {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Price Range</Label>
          <span className="text-xs text-muted-foreground">
            {formatPKR(priceRange[0])} - {formatPKR(priceRange[1])}
          </span>
        </div>
        <Slider
          min={0}
          max={40000000}
          step={500000}
          value={priceRange}
          onValueChange={(v) => setPriceRange(v as [number, number])}
          onValueCommit={applyPriceRange}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden lg:block sticky top-24 rounded-2xl border border-border bg-card p-6">
        {content}
      </div>

      <Button
        variant="outline"
        className="lg:hidden w-full"
        onClick={() => setOpen(true)}
      >
        <Filter className="h-4 w-4" />
        Filters {activeCount > 0 && `(${activeCount})`}
      </Button>

      <Sheet open={open} onClose={() => setOpen(false)} title="Filters">
        {content}
        <Button className="w-full mt-6" onClick={() => setOpen(false)}>
          Apply Filters
        </Button>
      </Sheet>
    </>
  );
}
