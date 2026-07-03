"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, GitCompare, Gauge, Fuel, Settings2, MapPin, Eye, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatPKR, formatKm } from "@/lib/utils";
import { useGarageStore } from "@/lib/store";
import type { CarT } from "@/lib/data";
import { toast } from "sonner";

export function CarCard({
  car,
  view = "grid",
  onQuickView,
  priority = false,
}: {
  car: CarT;
  view?: "grid" | "list";
  onQuickView?: (car: CarT) => void;
  priority?: boolean;
}) {
  const { toggleWishlist, isWishlisted, toggleCompare, isCompared } = useGarageStore();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const wishlisted = mounted && isWishlisted(car.id);
  const compared = mounted && isCompared(car.id);
  const cover = car.images?.[0]?.url;

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(car.id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      description: `${car.brand} ${car.model} ${car.year}`,
    });
  }

  function handleCompare(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const ok = toggleCompare(car.id);
    if (!ok) {
      toast.error("Compare limit reached", { description: "You can compare up to 3 vehicles at once." });
    } else {
      toast.success(compared ? "Removed from compare" : "Added to compare");
    }
  }

  if (view === "list") {
    return (
      <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="card-hover overflow-hidden">
          <Link href={`/inventory/${car.slug}`} className="flex flex-col sm:flex-row">
            <div className="relative h-52 sm:h-auto sm:w-72 shrink-0 overflow-hidden">
              {cover && (
                <Image
                  src={cover}
                  alt={car.images[0]?.alt || `${car.brand} ${car.model}`}
                  fill
                  sizes="288px"
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority={priority}
                />
              )}
              {car.status !== "Available" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <Badge variant="dark" className="text-sm px-3 py-1">{car.status}</Badge>
                </div>
              )}
              <div className="absolute top-3 left-3 flex gap-1.5">
                {car.isNewArrival && <Badge variant="default">New Arrival</Badge>}
                {car.featured && <Badge variant="dark">Featured</Badge>}
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between p-5">
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display font-semibold text-lg leading-tight">
                      {car.brand} {car.model} {car.variant}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-0.5 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {car.city}
                    </p>
                  </div>
                  <p className="text-xl font-bold text-primary whitespace-nowrap">{formatPKR(car.price)}</p>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Gauge className="h-3.5 w-3.5" />{formatKm(car.mileageKm)}</span>
                  <span className="flex items-center gap-1"><Fuel className="h-3.5 w-3.5" />{car.fuelType}</span>
                  <span className="flex items-center gap-1"><Settings2 className="h-3.5 w-3.5" />{car.transmission}</span>
                  <span>{car.year}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button size="sm" className="flex-1 sm:flex-none">View Details</Button>
                <Button size="icon" variant="outline" onClick={handleWishlist} aria-label="Wishlist">
                  <Heart className={cn("h-4 w-4", wishlisted && "fill-primary text-primary")} />
                </Button>
                <Button size="icon" variant="outline" onClick={handleCompare} aria-label="Compare">
                  <GitCompare className={cn("h-4 w-4", compared && "text-primary")} />
                </Button>
              </div>
            </div>
          </Link>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
      <Card className="card-hover overflow-hidden group h-full flex flex-col">
        <div className="relative h-52 overflow-hidden">
          <Link href={`/inventory/${car.slug}`}>
            {cover && (
              <Image
                src={cover}
                alt={car.images[0]?.alt || `${car.brand} ${car.model}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={priority}
              />
            )}
          </Link>
          {car.status !== "Available" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60">
              <Badge variant="dark" className="text-sm px-3 py-1">{car.status}</Badge>
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {car.isNewArrival && <Badge variant="default">New Arrival</Badge>}
            {car.featured && <Badge variant="dark">Featured</Badge>}
          </div>
          <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" variant="glass" className="h-8 w-8" onClick={handleWishlist} aria-label="Wishlist">
              <Heart className={cn("h-3.5 w-3.5", wishlisted && "fill-primary text-primary")} />
            </Button>
            <Button size="icon" variant="glass" className="h-8 w-8" onClick={handleCompare} aria-label="Compare">
              <GitCompare className={cn("h-3.5 w-3.5", compared && "text-primary")} />
            </Button>
            {onQuickView && (
              <Button
                size="icon"
                variant="glass"
                className="h-8 w-8"
                onClick={(e) => {
                  e.preventDefault();
                  onQuickView(car);
                }}
                aria-label="Quick view"
              >
                <Eye className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          {car.inspection === "Passed" && (
            <div className="absolute bottom-3 left-3">
              <Badge variant="success" className="bg-white/90 dark:bg-black/70">
                <CheckCircle2 className="h-3 w-3" /> Inspected
              </Badge>
            </div>
          )}
        </div>

        <Link href={`/inventory/${car.slug}`} className="flex flex-col flex-1 p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-semibold leading-tight line-clamp-1">
              {car.brand} {car.model}
            </h3>
          </div>
          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{car.variant}</p>

          <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground">
            <span>{car.year}</span>
            <span className="flex items-center gap-1"><Gauge className="h-3 w-3" />{formatKm(car.mileageKm)}</span>
            <span className="flex items-center gap-1"><Fuel className="h-3 w-3" />{car.fuelType}</span>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border pt-3">
            <p className="text-lg font-bold text-primary">{formatPKR(car.price)}</p>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" /> {car.city}
            </span>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}
