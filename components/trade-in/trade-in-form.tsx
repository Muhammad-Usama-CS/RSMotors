"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Upload, X, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BRANDS, CITIES, YEARS } from "@/lib/constants";
import { formatPKR } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")),
  brand: z.string().min(1, "Select a brand"),
  model: z.string().min(1, "Model is required"),
  year: z.string().min(1, "Select a year"),
  mileageKm: z.string().min(1, "Mileage is required"),
  condition: z.string().min(1, "Select condition"),
  city: z.string().min(1, "Select a city"),
});
type FormValues = z.infer<typeof schema>;

export function TradeInForm() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const [images, setImages] = React.useState<string[]>([]);
  const [result, setResult] = React.useState<number | null>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls = files.slice(0, 6 - images.length).map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/tradein", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          year: Number(data.year),
          mileageKm: Number(data.mileageKm),
          images: images.length > 0 ? `${images.length} photo(s) uploaded` : undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error();
      setResult(json.estimatedValue);
      toast.success("Valuation submitted!", { description: "Our team will contact you to confirm the final offer." });
      reset();
      setImages([]);
    } catch {
      toast.error("Something went wrong", { description: "Please try again or call us directly." });
    }
  }

  if (result !== null) {
    return (
      <Card className="p-10 text-center max-w-lg mx-auto">
        <CheckCircle2 className="h-12 w-12 text-success mx-auto mb-4" />
        <h3 className="font-display text-xl font-semibold">Estimated Trade-In Value</h3>
        <p className="text-3xl font-bold text-primary mt-3">{formatPKR(result)}</p>
        <p className="text-sm text-muted-foreground mt-3">
          This is a preliminary estimate. Our team will contact you within 24 hours to schedule an
          in-person inspection and confirm the final offer.
        </p>
        <Button className="mt-6" onClick={() => setResult(null)}>
          Submit Another Vehicle
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 sm:p-8 max-w-2xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <h3 className="font-display font-semibold text-lg mb-4">Vehicle Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Brand</Label>
              <Select onValueChange={(v) => setValue("brand", v)}>
                <SelectTrigger><SelectValue placeholder="Select brand" /></SelectTrigger>
                <SelectContent>
                  {BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.brand && <p className="text-xs text-destructive">{errors.brand.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="model">Model</Label>
              <Input id="model" {...register("model")} placeholder="e.g. Corolla" />
              {errors.model && <p className="text-xs text-destructive">{errors.model.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Year</Label>
              <Select onValueChange={(v) => setValue("year", v)}>
                <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                <SelectContent>
                  {YEARS.map((y) => <SelectItem key={y} value={String(y)}>{y}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.year && <p className="text-xs text-destructive">{errors.year.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="mileageKm">Mileage (km)</Label>
              <Input id="mileageKm" type="number" {...register("mileageKm")} placeholder="e.g. 45000" />
              {errors.mileageKm && <p className="text-xs text-destructive">{errors.mileageKm.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>Condition</Label>
              <Select onValueChange={(v) => setValue("condition", v)}>
                <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Excellent">Excellent</SelectItem>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Needs Work">Needs Work</SelectItem>
                </SelectContent>
              </Select>
              {errors.condition && <p className="text-xs text-destructive">{errors.condition.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label>City</Label>
              <Select onValueChange={(v) => setValue("city", v)}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.city && <p className="text-xs text-destructive">{errors.city.message}</p>}
            </div>
          </div>
        </div>

        <div>
          <Label>Vehicle Photos (optional)</Label>
          <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-3">
            {images.map((img, i) => (
              <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border">
                <img src={img} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {images.length < 6 && (
              <label className="flex aspect-square flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-border cursor-pointer hover:border-primary transition-colors text-muted-foreground">
                <Upload className="h-5 w-5" />
                <span className="text-xs">Add Photo</span>
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
              </label>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-display font-semibold text-lg mb-4">Your Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" {...register("name")} placeholder="Ahmed Khan" />
              {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" {...register("phone")} placeholder="03XX-XXXXXXX" />
              {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <Label htmlFor="email">Email (optional)</Label>
              <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
            </div>
          </div>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Calculating..." : "Get My Valuation"}
        </Button>
      </form>
    </Card>
  );
}
