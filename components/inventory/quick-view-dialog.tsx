"use client";

import Image from "next/image";
import Link from "next/link";
import { Gauge, Fuel, Settings2, MapPin, Calendar } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPKR, formatKm } from "@/lib/utils";
import type { CarT } from "@/lib/data";

export function QuickViewDialog({ car, onClose }: { car: CarT | null; onClose: () => void }) {
  return (
    <Dialog open={!!car} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        {car && (
          <>
            <DialogHeader>
              <DialogTitle className="font-display text-xl pr-6">
                {car.brand} {car.model} {car.variant}
              </DialogTitle>
            </DialogHeader>
            <div className="relative h-64 rounded-xl overflow-hidden">
              {car.images[0] && (
                <Image src={car.images[0].url} alt={car.brand} fill className="object-cover" />
              )}
              <div className="absolute top-3 left-3 flex gap-1.5">
                {car.isNewArrival && <Badge>New Arrival</Badge>}
                {car.featured && <Badge variant="dark">Featured</Badge>}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{car.year}</div>
              <div className="flex items-center gap-2"><Gauge className="h-4 w-4 text-primary" />{formatKm(car.mileageKm)}</div>
              <div className="flex items-center gap-2"><Fuel className="h-4 w-4 text-primary" />{car.fuelType}</div>
              <div className="flex items-center gap-2"><Settings2 className="h-4 w-4 text-primary" />{car.transmission}</div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-3">{car.description}</p>

            <div className="flex items-center justify-between border-t border-border pt-4">
              <div>
                <p className="text-2xl font-bold text-primary">{formatPKR(car.price)}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{car.city}</p>
              </div>
              <Button asChild>
                <Link href={`/inventory/${car.slug}`}>View Full Details</Link>
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
