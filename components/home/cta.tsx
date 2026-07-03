"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="container-px mx-auto max-w-7xl py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl gradient-red px-6 py-16 sm:px-16 sm:py-20 text-center text-white"
      >
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />
        <div className="relative">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-balance max-w-2xl mx-auto">
            Ready to Find Your Perfect Car?
          </h2>
          <p className="mt-4 text-white/85 max-w-xl mx-auto text-balance">
            Browse our full inventory or speak with our team today for personalized recommendations.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="dark">
              <Link href="/inventory">
                Explore Inventory <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="glass" className="text-white border-white/30">
              <a href="tel:+923001234567">
                <Phone className="h-4 w-4" /> +92 300 1234567
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
