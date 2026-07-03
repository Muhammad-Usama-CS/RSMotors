"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Wallet, Award, Headphones, FileCheck, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Inspection",
    description: "Every vehicle passes a rigorous 100+ point inspection before listing.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description: "No hidden charges. The price you see is the price you pay.",
  },
  {
    icon: Award,
    title: "Easy Financing",
    description: "Flexible EMI plans with partner banks tailored to your budget.",
  },
  {
    icon: FileCheck,
    title: "Clean Documentation",
    description: "Complete, verified paperwork with token tax and registration checks.",
  },
  {
    icon: RefreshCw,
    title: "Trade-In Support",
    description: "Get a fair valuation for your current vehicle and upgrade seamlessly.",
  },
  {
    icon: Headphones,
    title: "Dedicated Support",
    description: "Our team is with you from test drive to delivery and beyond.",
  },
];

export function WhyRsMotors() {
  return (
    <section className="section-y container-px mx-auto max-w-7xl">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="The RS Motors Difference"
        description="We've reimagined car buying in Pakistan to be transparent, fast, and stress-free."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <Card className="p-6 h-full card-hover">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-red text-white mb-4">
                <f.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
