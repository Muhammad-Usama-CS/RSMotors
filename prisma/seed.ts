import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { carsData, reviewsData, inspectionChecklist, cities } from "../lib/seed-data";

const prisma = new PrismaClient();

function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

async function main() {
  console.log("Seeding database...");

  await prisma.carImage.deleteMany();
  await prisma.inspectionItem.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.car.deleteMany();
  await prisma.review.deleteMany();
  await prisma.admin.deleteMany();

  for (let i = 0; i < carsData.length; i++) {
    const c = carsData[i] as any;
    const slug = `${slugify(c.brand)}-${slugify(c.model)}-${c.year}-${i}`;
    const city = cities[i % cities.length];
    const seedKey = `${slugify(c.brand)}-${slugify(c.model)}-${i}`;

    await prisma.car.create({
      data: {
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
        featured: c.featured,
        isNewArrival: c.isNewArrival,
        description: c.description,
        features: c.features,
        images: {
          create: [
            { url: `https://picsum.photos/seed/${seedKey}-1/1200/800`, alt: `${c.brand} ${c.model} front`, order: 0 },
            { url: `https://picsum.photos/seed/${seedKey}-2/1200/800`, alt: `${c.brand} ${c.model} side`, order: 1 },
            { url: `https://picsum.photos/seed/${seedKey}-3/1200/800`, alt: `${c.brand} ${c.model} interior`, order: 2 },
            { url: `https://picsum.photos/seed/${seedKey}-4/1200/800`, alt: `${c.brand} ${c.model} rear`, order: 3 },
          ],
        },
        inspectionReport: { create: inspectionChecklist },
      },
    });
  }

  for (const r of reviewsData) {
    await prisma.review.create({ data: r });
  }

  const hashedPassword = await bcrypt.hash("RSMotors@2026", 10);
  await prisma.admin.create({
    data: {
      name: "RS Motors Admin",
      email: "admin@rsmotors.pk",
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`Seeded ${carsData.length} cars, ${reviewsData.length} reviews, and 1 admin user.`);
  console.log("Admin login -> email: admin@rsmotors.pk | password: RSMotors@2026");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
