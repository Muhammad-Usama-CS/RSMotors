"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, GitCompare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGarageStore } from "@/lib/store";
import type { CarT } from "@/lib/data";
import { formatPKR } from "@/lib/utils";

export function CompareBar({ allCars }: { allCars: CarT[] }) {
  const { compare, removeFromCompare, clearCompare } = useGarageStore();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  if (!mounted || compare.length === 0) return null;

  const comparedCars = compare.map((id) => allCars.find((c) => c.id === id)).filter(Boolean) as CarT[];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-card/95 backdrop-blur-xl shadow-2xl"
      >
        <div className="container-px mx-auto max-w-7xl py-3 flex items-center gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <GitCompare className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium hidden sm:inline">Compare ({compare.length}/3)</span>
          </div>
          <div className="flex gap-3 flex-1">
            {comparedCars.map((car) => (
              <div key={car.id} className="relative flex items-center gap-2 rounded-xl border border-border p-2 shrink-0">
                <div className="relative h-10 w-14 rounded-lg overflow-hidden shrink-0">
                  {car.images[0] && <Image src={car.images[0].url} alt={car.brand} fill className="object-cover" />}
                </div>
                <div className="text-xs">
                  <p className="font-medium line-clamp-1">{car.brand} {car.model}</p>
                  <p className="text-muted-foreground">{formatPKR(car.price)}</p>
                </div>
                <button onClick={() => removeFromCompare(car.id)} className="ml-1 text-muted-foreground hover:text-destructive">
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2 shrink-0">
            <Button variant="ghost" size="sm" onClick={clearCompare}>Clear</Button>
            <Button
              size="sm"
              disabled={compare.length < 2}
              asChild={compare.length >= 2}
            >
              {compare.length >= 2 ? (
                <Link href={`/inventory/compare?ids=${compare.join(",")}`}>Compare Now</Link>
              ) : (
                <span>Add 1 more</span>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
