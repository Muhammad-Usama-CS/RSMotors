export const BRANDS = ["Toyota", "Honda", "Suzuki", "Kia", "Hyundai", "MG", "Changan", "Proton"];

export const FUEL_TYPES = ["Petrol", "Diesel", "Hybrid", "Electric", "CNG"];

export const TRANSMISSIONS = ["Manual", "Automatic", "CVT"];

export const BODY_TYPES = ["Sedan", "Hatchback", "SUV", "Crossover", "Van", "Pickup", "Coupe"];

export const CITIES = ["Lahore", "Karachi", "Islamabad", "Rawalpindi", "Faisalabad", "Multan", "Sialkot"];

export const YEARS = Array.from({ length: 2026 - 2005 + 1 }, (_, i) => 2026 - i);

export const PRICE_RANGES = [
  { label: "Under 30 Lakh", min: 0, max: 3000000 },
  { label: "30 - 60 Lakh", min: 3000000, max: 6000000 },
  { label: "60 Lakh - 1 Crore", min: 6000000, max: 10000000 },
  { label: "1 - 2 Crore", min: 10000000, max: 20000000 },
  { label: "Above 2 Crore", min: 20000000, max: 100000000 },
];

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest Listed" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "year-desc", label: "Year: Newest First" },
  { value: "mileage-asc", label: "Mileage: Lowest First" },
];
