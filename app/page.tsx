import type { Metadata } from "next";
import { Hero } from "@/components/home/hero";
import { FeaturedCars } from "@/components/home/featured-cars";
import { NewArrivals } from "@/components/home/new-arrivals";
import { WhyRsMotors } from "@/components/home/why-rs-motors";
import { Reviews } from "@/components/home/reviews";
import { CTA } from "@/components/home/cta";
import { LocationMap } from "@/components/shared/location-map";

export const metadata: Metadata = {
  title: "RS Motors — Premium New & Used Cars in Pakistan",
  description:
    "Browse verified Toyota, Honda, Suzuki, Kia, Hyundai, MG, Changan and Proton vehicles with transparent PKR pricing, financing, and inspection reports at RS Motors.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCars />
      <NewArrivals />
      <WhyRsMotors />
      <Reviews />
      <CTA />
      <LocationMap />
    </>
  );
}
