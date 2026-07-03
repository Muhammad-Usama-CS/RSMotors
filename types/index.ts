import type { CarT } from "@/lib/data";

export type CarWithImages = CarT;

export interface SearchFilters {
  brand?: string;
  model?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  fuelType?: string;
  transmission?: string;
  bodyType?: string;
  city?: string;
  sort?: string;
  page?: number;
  view?: "grid" | "list";
}
