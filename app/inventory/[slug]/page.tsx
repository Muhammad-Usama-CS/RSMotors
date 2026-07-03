import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCars, getCarBySlug, getSimilarCars } from "@/lib/data";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Gallery } from "@/components/car-details/gallery";
import { SpecsTable } from "@/components/car-details/specs-table";
import { FeaturesList } from "@/components/car-details/features-list";
import { InspectionReport } from "@/components/car-details/inspection-report";
import { PricingSidebar } from "@/components/car-details/pricing-sidebar";
import { SimilarCars } from "@/components/car-details/similar-cars";
import { formatPKR, formatKm } from "@/lib/utils";
import { Gauge, Fuel, Settings2, Calendar, MapPin } from "lucide-react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://rsmotors.pk";

export async function generateStaticParams() {
  const cars = await getAllCars();
  return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) return { title: "Vehicle Not Found" };

  const title = `${car.brand} ${car.model} ${car.year} for Sale in ${car.city}`;
  const description = `${car.brand} ${car.model} ${car.variant || ""} (${car.year}) — ${formatPKR(car.price)}. ${formatKm(car.mileageKm)}, ${car.fuelType}, ${car.transmission}. Verified and inspected at RS Motors.`;

  return {
    title,
    description,
    alternates: { canonical: `/inventory/${car.slug}` },
    openGraph: {
      title,
      description,
      images: car.images.map((img) => ({ url: img.url, width: 1200, height: 800 })),
    },
  };
}

export default async function CarDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const car = await getCarBySlug(slug);
  if (!car) notFound();

  const similar = await getSimilarCars(car, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    name: `${car.brand} ${car.model} ${car.variant || ""}`.trim(),
    brand: car.brand,
    model: car.model,
    vehicleModelDate: String(car.year),
    mileageFromOdometer: { "@type": "QuantitativeValue", value: car.mileageKm, unitCode: "KMT" },
    fuelType: car.fuelType,
    vehicleTransmission: car.transmission,
    vehicleConfiguration: car.bodyType,
    color: car.color,
    image: car.images.map((i) => i.url),
    offers: {
      "@type": "Offer",
      price: car.price,
      priceCurrency: "PKR",
      availability: car.status === "Available" ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/inventory/${car.slug}`,
    },
  };

  return (
    <div className="container-px mx-auto max-w-7xl py-8">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { label: "Inventory", href: "/inventory" },
          { label: `${car.brand} ${car.model}` },
        ]}
      />

      <div className="mt-4 mb-6">
        <h1 className="font-display text-2xl sm:text-3xl font-bold">
          {car.brand} {car.model} {car.variant}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
          <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{car.year}</span>
          <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{formatKm(car.mileageKm)}</span>
          <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" />{car.fuelType}</span>
          <span className="flex items-center gap-1"><Settings2 className="h-3.5 w-3.5" />{car.transmission}</span>
          <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{car.city}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
        <div className="space-y-8">
          <Gallery images={car.images} title={`${car.brand} ${car.model}`} />

          <div>
            <h2 className="font-display text-xl font-semibold mb-3">Description</h2>
            <p className="text-muted-foreground leading-relaxed">{car.description}</p>
          </div>

          <SpecsTable car={car} />
          <FeaturesList features={car.features} />
          <InspectionReport items={car.inspectionReport} status={car.inspection} />
        </div>

        <div>
          <PricingSidebar car={car} />
        </div>
      </div>

      <SimilarCars cars={similar} />
    </div>
  );
}
