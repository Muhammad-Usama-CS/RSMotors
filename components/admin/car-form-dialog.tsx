"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { BRANDS, FUEL_TYPES, TRANSMISSIONS, BODY_TYPES, CITIES } from "@/lib/constants";
import type { CarT } from "@/lib/data";

interface FormState {
  brand: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  mileageKm: number;
  fuelType: string;
  transmission: string;
  bodyType: string;
  city: string;
  color: string;
  engineCC: number | "";
  ownership: string;
  inspection: string;
  financeAvailable: boolean;
  featured: boolean;
  isNewArrival: boolean;
  description: string;
  features: string;
}

const emptyForm: FormState = {
  brand: "Toyota",
  model: "",
  variant: "",
  year: 2024,
  price: 0,
  mileageKm: 0,
  fuelType: "Petrol",
  transmission: "Manual",
  bodyType: "Sedan",
  city: "Lahore",
  color: "",
  engineCC: "",
  ownership: "1st Owner",
  inspection: "NotInspected",
  financeAvailable: true,
  featured: false,
  isNewArrival: true,
  description: "",
  features: "",
};

export function CarFormDialog({
  open,
  onClose,
  car,
  onSaved,
}: {
  open: boolean;
  onClose: () => void;
  car: CarT | null;
  onSaved: () => void;
}) {
  const [form, setForm] = React.useState<FormState>(emptyForm);
  const [images, setImages] = React.useState<string[]>([]);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (car) {
      setForm({
        brand: car.brand,
        model: car.model,
        variant: car.variant || "",
        year: car.year,
        price: car.price,
        mileageKm: car.mileageKm,
        fuelType: car.fuelType,
        transmission: car.transmission,
        bodyType: car.bodyType,
        city: car.city,
        color: car.color,
        engineCC: car.engineCC || "",
        ownership: car.ownership,
        inspection: car.inspection,
        financeAvailable: car.financeAvailable,
        featured: car.featured,
        isNewArrival: car.isNewArrival,
        description: car.description,
        features: car.features,
      });
      setImages(car.images.map((i) => i.url));
    } else {
      setForm(emptyForm);
      setImages([]);
    }
  }, [car, open]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setImages((prev) => [...prev, ...urls]);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { ...form, engineCC: form.engineCC === "" ? null : Number(form.engineCC), images };
      const res = await fetch(car ? `/api/admin/cars/${car.id}` : "/api/admin/cars", {
        method: car ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      toast.success(car ? "Vehicle updated" : "Vehicle added");
      onSaved();
      onClose();
    } catch {
      toast.error("Failed to save vehicle");
    } finally {
      setSaving(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{car ? "Edit Vehicle" : "Add New Vehicle"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <Label>Brand</Label>
              <Select value={form.brand} onValueChange={(v) => set("brand", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{BRANDS.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Model</Label>
              <Input value={form.model} onChange={(e) => set("model", e.target.value)} placeholder="Corolla" />
            </div>
            <div className="space-y-1.5">
              <Label>Variant</Label>
              <Input value={form.variant} onChange={(e) => set("variant", e.target.value)} placeholder="Altis Grande" />
            </div>
            <div className="space-y-1.5">
              <Label>Year</Label>
              <Input type="number" value={form.year} onChange={(e) => set("year", Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Price (PKR)</Label>
              <Input type="number" value={form.price} onChange={(e) => set("price", Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Mileage (km)</Label>
              <Input type="number" value={form.mileageKm} onChange={(e) => set("mileageKm", Number(e.target.value))} />
            </div>
            <div className="space-y-1.5">
              <Label>Fuel Type</Label>
              <Select value={form.fuelType} onValueChange={(v) => set("fuelType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{FUEL_TYPES.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Transmission</Label>
              <Select value={form.transmission} onValueChange={(v) => set("transmission", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{TRANSMISSIONS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Body Type</Label>
              <Select value={form.bodyType} onValueChange={(v) => set("bodyType", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{BODY_TYPES.map((b) => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>City</Label>
              <Select value={form.city} onValueChange={(v) => set("city", v)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{CITIES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Color</Label>
              <Input value={form.color} onChange={(e) => set("color", e.target.value)} placeholder="Pearl White" />
            </div>
            <div className="space-y-1.5">
              <Label>Engine (cc)</Label>
              <Input
                type="number"
                value={form.engineCC}
                onChange={(e) => set("engineCC", e.target.value === "" ? "" : Number(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} />
          </div>
          <div className="space-y-1.5">
            <Label>Features (comma-separated)</Label>
            <Textarea value={form.features} onChange={(e) => set("features", e.target.value)} rows={2} placeholder="Sunroof, Cruise Control, Alloy Rims" />
          </div>

          <div className="space-y-1.5">
            <Label>Images</Label>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-border">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                    className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
              <label className="flex aspect-square flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-border cursor-pointer hover:border-primary text-muted-foreground">
                <Upload className="h-4 w-4" />
                <input type="file" accept="image/*" multiple className="hidden" onChange={handleFiles} />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <Label className="text-xs">Financing</Label>
              <Switch checked={form.financeAvailable} onCheckedChange={(v) => set("financeAvailable", v)} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <Label className="text-xs">Featured</Label>
              <Switch checked={form.featured} onCheckedChange={(v) => set("featured", v)} />
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border p-3">
              <Label className="text-xs">New Arrival</Label>
              <Switch checked={form.isNewArrival} onCheckedChange={(v) => set("isNewArrival", v)} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving || !form.model}>
            {saving ? "Saving..." : car ? "Save Changes" : "Add Vehicle"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
