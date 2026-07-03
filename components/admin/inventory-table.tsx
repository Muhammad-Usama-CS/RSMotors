"use client";

import * as React from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Star, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CarFormDialog } from "@/components/admin/car-form-dialog";
import { formatPKR, formatKm } from "@/lib/utils";
import { toast } from "sonner";
import type { CarT } from "@/lib/data";

export function InventoryTable({ initialCars }: { initialCars: CarT[] }) {
  const [cars, setCars] = React.useState(initialCars);
  const [search, setSearch] = React.useState("");
  const [formOpen, setFormOpen] = React.useState(false);
  const [editingCar, setEditingCar] = React.useState<CarT | null>(null);

  const filtered = cars.filter((c) =>
    `${c.brand} ${c.model} ${c.variant} ${c.city}`.toLowerCase().includes(search.toLowerCase())
  );

  async function refresh() {
    const res = await fetch("/api/admin/cars");
    if (res.ok) setCars(await res.json());
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this vehicle? This cannot be undone.")) return;
    const res = await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });
    if (res.ok) {
      setCars((prev) => prev.filter((c) => c.id !== id));
      toast.success("Vehicle deleted");
    } else {
      toast.error("Failed to delete vehicle");
    }
  }

  async function toggleFeatured(car: CarT) {
    const res = await fetch(`/api/admin/cars/${car.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ featured: !car.featured }),
    });
    if (res.ok) {
      setCars((prev) => prev.map((c) => (c.id === car.id ? { ...c, featured: !c.featured } : c)));
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold">Inventory</h1>
          <p className="text-muted-foreground mt-1">{cars.length} vehicles listed</p>
        </div>
        <Button
          onClick={() => {
            setEditingCar(null);
            setFormOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add Vehicle
        </Button>
      </div>

      <div className="relative mb-4 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search inventory..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
      </div>

      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border bg-secondary/40">
                <th className="p-4 font-medium">Vehicle</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Mileage</th>
                <th className="p-4 font-medium">City</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((car) => (
                <tr key={car.id} className="border-b border-border/60 last:border-0 hover:bg-accent/40">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-16 rounded-lg overflow-hidden shrink-0">
                        {car.images[0] && <Image src={car.images[0].url} alt={car.brand} fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-medium">{car.brand} {car.model}</p>
                        <p className="text-xs text-muted-foreground">{car.year} · {car.variant}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{formatPKR(car.price)}</td>
                  <td className="p-4">{formatKm(car.mileageKm)}</td>
                  <td className="p-4">{car.city}</td>
                  <td className="p-4">
                    <Badge variant={car.status === "Available" ? "success" : car.status === "Reserved" ? "warning" : "outline"}>
                      {car.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => toggleFeatured(car)}
                        aria-label="Toggle featured"
                      >
                        <Star className={`h-4 w-4 ${car.featured ? "fill-primary text-primary" : ""}`} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setEditingCar(car);
                          setFormOpen(true);
                        }}
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(car.id)}
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <CarFormDialog
        open={formOpen}
        onClose={() => setFormOpen(false)}
        car={editingCar}
        onSaved={refresh}
      />
    </div>
  );
}
