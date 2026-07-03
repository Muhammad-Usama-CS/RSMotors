import fs from "fs";
import path from "path";
import crypto from "crypto";
import { carsData, reviewsData, inspectionChecklist, cities } from "../lib/seed-data";

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function cuid(): string {
  return "c" + crypto.randomBytes(12).toString("hex");
}

const now = new Date().toISOString();

const cars = carsData.map((c: any, i: number) => {
  const id = cuid();
  const slug = `${slugify(c.brand)}-${slugify(c.model)}-${c.year}-${i}`;
  const city = cities[i % cities.length];
  const seedKey = `${slugify(c.brand)}-${slugify(c.model)}-${i}`;

  return {
    id,
    slug,
    brand: c.brand,
    model: c.model,
    variant: c.variant,
    year: c.year,
    price: c.price,
    mileageKm: c.mileageKm,
    fuelType: c.fuelType,
    transmission: c.transmission,
    bodyType: c.bodyType,
    city,
    color: c.color,
    engineCC: c.engineCC ?? null,
    ownership: c.ownership,
    registeredCity: city,
    inspection: c.inspection,
    financeAvailable: c.financeAvailable,
    status: "Available",
    featured: c.featured,
    isNewArrival: c.isNewArrival,
    description: c.description,
    features: c.features,
    images: [0, 1, 2, 3].map((n) => ({
      id: cuid(),
      url: `https://picsum.photos/seed/${seedKey}-${n + 1}/1200/800`,
      alt: `${c.brand} ${c.model} photo ${n + 1}`,
      order: n,
      carId: id,
    })),
    inspectionReport: inspectionChecklist.map((item) => ({
      id: cuid(),
      ...item,
      carId: id,
    })),
    createdAt: now,
    updatedAt: now,
  };
});

const reviews = reviewsData.map((r) => ({
  id: cuid(),
  ...r,
  avatar: null,
  createdAt: now,
}));

const outDir = path.join(__dirname, "..", "data");
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

fs.writeFileSync(path.join(outDir, "cars.json"), JSON.stringify(cars, null, 2));
fs.writeFileSync(path.join(outDir, "reviews.json"), JSON.stringify(reviews, null, 2));
fs.writeFileSync(path.join(outDir, "inquiries.json"), JSON.stringify([], null, 2));
fs.writeFileSync(path.join(outDir, "bookings.json"), JSON.stringify([], null, 2));
fs.writeFileSync(path.join(outDir, "reservations.json"), JSON.stringify([], null, 2));
fs.writeFileSync(path.join(outDir, "tradeins.json"), JSON.stringify([], null, 2));

console.log(`Generated ${cars.length} cars and ${reviews.length} reviews into /data`);
