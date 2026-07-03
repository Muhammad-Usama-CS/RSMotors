"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Expand, RotateCw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { CarImageT } from "@/lib/data";

export function Gallery({ images, title }: { images: CarImageT[]; title: string }) {
  const [active, setActive] = React.useState(0);
  const [lightbox, setLightbox] = React.useState(false);
  const [show360, setShow360] = React.useState(false);

  function next() {
    setActive((a) => (a + 1) % images.length);
  }
  function prev() {
    setActive((a) => (a - 1 + images.length) % images.length);
  }

  return (
    <div>
      <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-muted">
        {show360 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground text-white gap-3">
            <RotateCw className="h-10 w-10 animate-spin-slow" />
            <p className="text-sm font-medium">360° View</p>
            <p className="text-xs text-white/60 max-w-xs text-center">
              Interactive 360° walk-around coming soon for this vehicle. Contact us to schedule an in-person viewing.
            </p>
            <Button size="sm" variant="glass" className="text-white" onClick={() => setShow360(false)}>
              Back to Photos
            </Button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0"
            >
              <Image
                src={images[active]?.url}
                alt={images[active]?.alt || title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        )}

        {!show360 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-white/90"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-white/90"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              onClick={() => setLightbox(true)}
              className="absolute top-3 right-3 flex h-9 w-9 items-center justify-center rounded-full glass hover:bg-white/90"
              aria-label="Expand"
            >
              <Expand className="h-4 w-4" />
            </button>
            <Badge className="absolute bottom-3 left-3" variant="dark">
              {active + 1} / {images.length}
            </Badge>
          </>
        )}

        {!show360 && (
          <button
            onClick={() => setShow360(true)}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium hover:bg-white/90"
          >
            <RotateCw className="h-3.5 w-3.5" /> 360° View
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
        {images.map((img, i) => (
          <button
            key={img.id}
            onClick={() => {
              setActive(i);
              setShow360(false);
            }}
            className={cn(
              "relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all",
              active === i && !show360 ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
            )}
          >
            <Image src={img.url} alt={img.alt || title} fill sizes="120px" className="object-cover" />
          </button>
        ))}
      </div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setLightbox(false)}>
              <X className="h-7 w-7" />
            </button>
            <div className="relative w-full max-w-5xl aspect-[16/10]">
              <Image src={images[active]?.url} alt={images[active]?.alt || title} fill className="object-contain" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
