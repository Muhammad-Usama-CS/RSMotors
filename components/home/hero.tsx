"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Users } from "lucide-react";
import { AdvancedSearch } from "@/components/shared/advanced-search";

const stats = [
  { icon: Users, label: "Happy Customers", value: "5,000+" },
  { icon: Award, label: "Verified Vehicles", value: "1,200+" },
  { icon: ShieldCheck, label: "Years of Trust", value: "12+" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-foreground text-white">
      <div className="absolute inset-0">
        <Image
          src="https://picsum.photos/seed/rsmotors-hero/1920/1080"
          alt="Luxury car at RS Motors showroom"
          fill
          priority
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/80 to-foreground/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </div>

      <div className="relative container-px mx-auto max-w-7xl pt-28 pb-20 sm:pt-36 sm:pb-28 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          Pakistan&apos;s Premium Auto Dealership
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] text-balance max-w-4xl"
        >
          Drive Your <span className="text-gradient">Dream Car</span> Home Today
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-white/70 text-base sm:text-lg text-balance"
        >
          Verified inspections, transparent PKR pricing, and flexible financing on Pakistan&apos;s
          finest selection of new and used vehicles.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 w-full flex justify-center"
        >
          <AdvancedSearch />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 grid grid-cols-3 gap-8 sm:gap-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5">
              <s.icon className="h-5 w-5 text-primary mb-1" />
              <p className="font-display text-2xl sm:text-3xl font-bold">{s.value}</p>
              <p className="text-xs sm:text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
