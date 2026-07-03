import type { Metadata } from "next";
import Image from "next/image";
import { Breadcrumbs } from "@/components/shared/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Users, Award, ShieldCheck, TrendingUp } from "lucide-react";
import { LocationMap } from "@/components/shared/location-map";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about RS Motors, Pakistan's trusted dealership for premium new and used vehicles, our mission, values, and commitment to transparent car buying.",
  alternates: { canonical: "/about" },
};

const stats = [
  { icon: Users, value: "5,000+", label: "Happy Customers" },
  { icon: Award, value: "1,200+", label: "Vehicles Sold" },
  { icon: ShieldCheck, value: "12+", label: "Years of Trust" },
  { icon: TrendingUp, value: "98%", label: "Satisfaction Rate" },
];

const team = [
  { name: "Rashid Siddiqui", role: "Founder & CEO", seed: "team-1" },
  { name: "Sara Ahmed", role: "Head of Sales", seed: "team-2" },
  { name: "Kamran Ali", role: "Inspection Manager", seed: "team-3" },
  { name: "Nida Farooq", role: "Customer Relations", seed: "team-4" },
];

export default function AboutPage() {
  return (
    <div>
      <section className="container-px mx-auto max-w-6xl py-8">
        <Breadcrumbs items={[{ label: "About" }]} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Our Story
            </span>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-balance">
              Redefining Car Buying in Pakistan
            </h1>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Founded over a decade ago in Lahore, RS Motors set out to solve a simple problem:
              buying a used car in Pakistan shouldn&apos;t feel like a gamble. We built our
              business around rigorous inspections, transparent pricing, and genuine customer care —
              principles that continue to guide everything we do today.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              From our showroom on Gulberg&apos;s Main Boulevard, we&apos;ve helped thousands of
              families across Pakistan find their perfect vehicle, backed by verified documentation,
              fair financing options, and after-sales support that goes beyond the handshake.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
            <Image
              src="https://picsum.photos/seed/rsmotors-about/900/700"
              alt="RS Motors showroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 dark:bg-black/20 py-16">
        <div className="container-px mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Card key={s.label} className="p-6 text-center">
              <s.icon className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="font-display text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-px mx-auto max-w-6xl py-16">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <span className="inline-block text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Our Team
          </span>
          <h2 className="font-display text-3xl font-bold">Meet the People Behind RS Motors</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {team.map((member) => (
            <Card key={member.name} className="overflow-hidden text-center">
              <div className="relative aspect-square">
                <Image
                  src={`https://picsum.photos/seed/${member.seed}/400/400`}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <p className="font-semibold text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <LocationMap />
    </div>
  );
}
