import fs from "fs";
import path from "path";
import type { SearchFilters } from "@/types";

const DATA_DIR = path.join(process.cwd(), "data");

function readJson<T>(file: string): T {
  const p = path.join(DATA_DIR, file);
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}

function writeJson<T>(file: string, data: T) {
  const p = path.join(DATA_DIR, file);
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}

function cuid(): string {
  return "c" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export interface CarImageT {
  id: string;
  url: string;
  alt?: string | null;
  order: number;
  carId: string;
}
export interface InspectionItemT {
  id: string;
  label: string;
  status: string;
  notes?: string | null;
  carId: string;
}
export interface CarT {
  id: string;
  slug: string;
  brand: string;
  model: string;
  variant?: string | null;
  year: number;
  price: number;
  mileageKm: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  city: string;
  color: string;
  engineCC?: number | null;
  ownership: string;
  registeredCity?: string | null;
  inspection: string;
  financeAvailable: boolean;
  status: string;
  featured: boolean;
  isNewArrival: boolean;
  description: string;
  features: string;
  images: CarImageT[];
  inspectionReport: InspectionItemT[];
  createdAt: string;
  updatedAt: string;
}

export interface ReviewT {
  id: string;
  name: string;
  rating: number;
  comment: string;
  carBought?: string | null;
  avatar?: string | null;
  createdAt: string;
}

// ---------- Public read queries (mirrors Prisma car.findMany etc.) ----------

export async function getAllCars(): Promise<CarT[]> {
  return readJson<CarT[]>("cars.json");
}

export async function getCarBySlug(slug: string): Promise<CarT | undefined> {
  const cars = await getAllCars();
  return cars.find((c) => c.slug === slug);
}

export async function getCarById(id: string): Promise<CarT | undefined> {
  const cars = await getAllCars();
  return cars.find((c) => c.id === id);
}

export async function getFeaturedCars(limit = 6): Promise<CarT[]> {
  const cars = await getAllCars();
  return cars.filter((c) => c.featured && c.status === "Available").slice(0, limit);
}

export async function getNewArrivals(limit = 8): Promise<CarT[]> {
  const cars = await getAllCars();
  return cars
    .filter((c) => c.isNewArrival && c.status === "Available")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
}

export async function getSimilarCars(car: CarT, limit = 4): Promise<CarT[]> {
  const cars = await getAllCars();
  return cars
    .filter(
      (c) =>
        c.id !== car.id &&
        c.status === "Available" &&
        (c.brand === car.brand || c.bodyType === car.bodyType) &&
        Math.abs(c.price - car.price) < car.price * 0.5
    )
    .slice(0, limit);
}

export async function getBrands(): Promise<string[]> {
  const cars = await getAllCars();
  return Array.from(new Set(cars.map((c) => c.brand))).sort();
}

export async function getModelsByBrand(brand?: string): Promise<string[]> {
  const cars = await getAllCars();
  const filtered = brand ? cars.filter((c) => c.brand === brand) : cars;
  return Array.from(new Set(filtered.map((c) => c.model))).sort();
}

export async function getCities(): Promise<string[]> {
  const cars = await getAllCars();
  return Array.from(new Set(cars.map((c) => c.city))).sort();
}

export async function filterCars(filters: SearchFilters): Promise<{ cars: CarT[]; total: number }> {
  let cars = (await getAllCars()).filter((c) => c.status !== "Sold");

  if (filters.brand) cars = cars.filter((c) => c.brand.toLowerCase() === filters.brand!.toLowerCase());
  if (filters.model) cars = cars.filter((c) => c.model.toLowerCase() === filters.model!.toLowerCase());
  if (filters.yearMin) cars = cars.filter((c) => c.year >= filters.yearMin!);
  if (filters.yearMax) cars = cars.filter((c) => c.year <= filters.yearMax!);
  if (filters.priceMin) cars = cars.filter((c) => c.price >= filters.priceMin!);
  if (filters.priceMax) cars = cars.filter((c) => c.price <= filters.priceMax!);
  if (filters.fuelType) cars = cars.filter((c) => c.fuelType === filters.fuelType);
  if (filters.transmission) cars = cars.filter((c) => c.transmission === filters.transmission);
  if (filters.bodyType) cars = cars.filter((c) => c.bodyType === filters.bodyType);
  if (filters.city) cars = cars.filter((c) => c.city === filters.city);

  switch (filters.sort) {
    case "price-asc":
      cars.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      cars.sort((a, b) => b.price - a.price);
      break;
    case "year-desc":
      cars.sort((a, b) => b.year - a.year);
      break;
    case "mileage-asc":
      cars.sort((a, b) => a.mileageKm - b.mileageKm);
      break;
    default:
      cars.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  const total = cars.length;
  const page = filters.page || 1;
  const pageSize = 12;
  const start = (page - 1) * pageSize;
  cars = cars.slice(start, start + pageSize);

  return { cars, total };
}

export async function getReviews(): Promise<ReviewT[]> {
  return readJson<ReviewT[]>("reviews.json");
}

// ---------- Mutations (forms) ----------

export async function createInquiry(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  source?: string;
}) {
  const inquiries = readJson<any[]>("inquiries.json");
  const record = { id: cuid(), status: "New", createdAt: new Date().toISOString(), source: "contact", ...data };
  inquiries.unshift(record);
  writeJson("inquiries.json", inquiries);
  return record;
}

export async function createBooking(data: {
  carId: string;
  name: string;
  phone: string;
  email?: string;
  date: string;
  notes?: string;
}) {
  const bookings = readJson<any[]>("bookings.json");
  const record = { id: cuid(), status: "Pending", createdAt: new Date().toISOString(), ...data };
  bookings.unshift(record);
  writeJson("bookings.json", bookings);
  return record;
}

export async function createReservation(data: {
  carId: string;
  name: string;
  phone: string;
  email?: string;
  amount?: number;
}) {
  const reservations = readJson<any[]>("reservations.json");
  const record = {
    id: cuid(),
    status: "Pending",
    amount: data.amount ?? 50000,
    createdAt: new Date().toISOString(),
    ...data,
  };
  reservations.unshift(record);
  writeJson("reservations.json", reservations);

  const cars = await getAllCars();
  const idx = cars.findIndex((c) => c.id === data.carId);
  if (idx >= 0) {
    cars[idx].status = "Reserved";
    writeJson("cars.json", cars);
  }
  return record;
}

export async function createTradeIn(data: {
  name: string;
  phone: string;
  email?: string;
  brand: string;
  model: string;
  year: number;
  mileageKm: number;
  condition: string;
  city: string;
  images?: string;
  estimatedValue?: number;
}) {
  const tradeins = readJson<any[]>("tradeins.json");
  const record = { id: cuid(), status: "New", createdAt: new Date().toISOString(), ...data };
  tradeins.unshift(record);
  writeJson("tradeins.json", tradeins);
  return record;
}

// ---------- Admin ----------

export async function getAllInquiries() {
  return readJson<any[]>("inquiries.json");
}
export async function getAllBookings() {
  return readJson<any[]>("bookings.json");
}
export async function getAllReservations() {
  return readJson<any[]>("reservations.json");
}
export async function getAllTradeIns() {
  return readJson<any[]>("tradeins.json");
}

export async function createCar(data: Partial<CarT> & { images?: string[] }) {
  const cars = await getAllCars();
  const id = cuid();
  const slug = `${data.brand}-${data.model}-${data.year}-${id}`
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");
  const now = new Date().toISOString();
  const imgs = (data.images && data.images.length > 0 ? data.images : [
    `https://picsum.photos/seed/${id}-1/1200/800`,
    `https://picsum.photos/seed/${id}-2/1200/800`,
  ]).map((url, i) => ({ id: cuid(), url, alt: `${data.brand} ${data.model}`, order: i, carId: id }));

  const car: CarT = {
    id,
    slug,
    brand: data.brand || "",
    model: data.model || "",
    variant: data.variant || "",
    year: data.year || new Date().getFullYear(),
    price: data.price || 0,
    mileageKm: data.mileageKm || 0,
    fuelType: data.fuelType || "Petrol",
    transmission: data.transmission || "Manual",
    bodyType: data.bodyType || "Sedan",
    city: data.city || "Lahore",
    color: data.color || "White",
    engineCC: data.engineCC || null,
    ownership: data.ownership || "1st Owner",
    registeredCity: data.registeredCity || data.city || "Lahore",
    inspection: data.inspection || "NotInspected",
    financeAvailable: data.financeAvailable ?? true,
    status: data.status || "Available",
    featured: data.featured ?? false,
    isNewArrival: data.isNewArrival ?? true,
    description: data.description || "",
    features: data.features || "",
    images: imgs,
    inspectionReport: [],
    createdAt: now,
    updatedAt: now,
  };
  cars.unshift(car);
  writeJson("cars.json", cars);
  return car;
}

export async function updateCar(id: string, data: Partial<CarT>) {
  const cars = await getAllCars();
  const idx = cars.findIndex((c) => c.id === id);
  if (idx === -1) return null;
  cars[idx] = { ...cars[idx], ...data, updatedAt: new Date().toISOString() };
  writeJson("cars.json", cars);
  return cars[idx];
}

export async function deleteCar(id: string) {
  const cars = await getAllCars();
  const filtered = cars.filter((c) => c.id !== id);
  writeJson("cars.json", filtered);
  return true;
}

export async function getDashboardStats() {
  const [cars, inquiries, bookings, reservations, tradeins] = await Promise.all([
    getAllCars(),
    getAllInquiries(),
    getAllBookings(),
    getAllReservations(),
    getAllTradeIns(),
  ]);

  const totalValue = cars.reduce((sum, c) => sum + c.price, 0);
  const available = cars.filter((c) => c.status === "Available").length;
  const reserved = cars.filter((c) => c.status === "Reserved").length;
  const sold = cars.filter((c) => c.status === "Sold").length;

  const brandCounts: Record<string, number> = {};
  cars.forEach((c) => {
    brandCounts[c.brand] = (brandCounts[c.brand] || 0) + 1;
  });

  return {
    totalCars: cars.length,
    available,
    reserved,
    sold,
    totalValue,
    totalInquiries: inquiries.length,
    totalBookings: bookings.length,
    totalReservations: reservations.length,
    totalTradeIns: tradeins.length,
    brandCounts,
    newInquiries: inquiries.filter((i) => i.status === "New").length,
  };
}
