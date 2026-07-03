"use client";

import * as React from "react";
import Link from "next/link";
import { MessageCircle, Calendar, ShieldCheck, Heart, GitCompare, Calculator } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatPKR, cn } from "@/lib/utils";
import { calculateEmi } from "@/lib/finance";
import { useGarageStore } from "@/lib/store";
import { toast } from "sonner";
import { BookTestDriveDialog } from "./book-test-drive-dialog";
import { ReserveCarDialog } from "./reserve-car-dialog";
import type { CarT } from "@/lib/data";

export function PricingSidebar({ car }: { car: CarT }) {
  const [bookOpen, setBookOpen] = React.useState(false);
  const [reserveOpen, setReserveOpen] = React.useState(false);
  const { toggleWishlist, isWishlisted, toggleCompare, isCompared } = useGarageStore();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const downPayment = Math.round(car.price * 0.3);
  const emi = calculateEmi({
    vehiclePrice: car.price,
    downPayment,
    interestRate: 16,
    tenureMonths: 60,
  });

  const whatsappMsg = encodeURIComponent(
    `Hi RS Motors, I'm interested in the ${car.brand} ${car.model} ${car.year} (${formatPKR(car.price)}). Is it still available?`
  );

  const wishlisted = mounted && isWishlisted(car.id);
  const compared = mounted && isCompared(car.id);

  return (
    <>
      <Card className="p-6 sticky top-24">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">Price</p>
            <p className="text-3xl font-bold text-primary font-display">{formatPKR(car.price)}</p>
          </div>
          {car.status === "Available" ? (
            <Badge variant="success">Available</Badge>
          ) : (
            <Badge variant="dark">{car.status}</Badge>
          )}
        </div>

        {car.financeAvailable && (
          <div className="mt-4 rounded-xl bg-secondary/60 dark:bg-white/5 p-4">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-2">
              <Calculator className="h-3.5 w-3.5" /> Estimated Monthly EMI
            </div>
            <p className="text-xl font-bold">{formatPKR(Math.round(emi.monthlyEmi))}<span className="text-sm font-normal text-muted-foreground">/mo</span></p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on 30% down payment, 16% APR, 60 months
            </p>
            <Link href="/finance" className="text-xs text-primary font-medium hover:underline mt-2 inline-block">
              Customize in Finance Calculator →
            </Link>
          </div>
        )}

        <div className="mt-5 space-y-2.5">
          <Button className="w-full" size="lg" onClick={() => setReserveOpen(true)}>
            <ShieldCheck className="h-4 w-4" /> Reserve This Car
          </Button>
          <Button variant="outline" className="w-full" size="lg" onClick={() => setBookOpen(true)}>
            <Calendar className="h-4 w-4" /> Book Test Drive
          </Button>
          <Button asChild className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white" size="lg">
            <a href={`https://wa.me/923001234567?text=${whatsappMsg}`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </Button>
        </div>

        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              toggleWishlist(car.id);
              toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
            }}
          >
            <Heart className={cn("h-4 w-4", wishlisted && "fill-primary text-primary")} /> Wishlist
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => {
              const ok = toggleCompare(car.id);
              if (!ok) toast.error("Compare limit reached (max 3)");
            }}
          >
            <GitCompare className={cn("h-4 w-4", compared && "text-primary")} /> Compare
          </Button>
        </div>

        <div className="mt-5 pt-5 border-t border-border text-xs text-muted-foreground space-y-1.5">
          <p>✓ {car.financeAvailable ? "Financing available" : "Cash purchase only"}</p>
          <p>✓ {car.inspection === "Passed" ? "Fully inspected & verified" : "Inspection in progress"}</p>
          <p>✓ Located in {car.city}</p>
        </div>
      </Card>

      <BookTestDriveDialog
        open={bookOpen}
        onClose={() => setBookOpen(false)}
        carId={car.id}
        carName={`${car.brand} ${car.model} ${car.year}`}
      />
      <ReserveCarDialog
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        carId={car.id}
        carName={`${car.brand} ${car.model} ${car.year}`}
      />
    </>
  );
}
