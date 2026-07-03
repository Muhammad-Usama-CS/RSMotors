"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatPKR } from "@/lib/utils";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number required"),
  email: z.string().email().optional().or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

export function ReserveCarDialog({
  open,
  onClose,
  carId,
  carName,
}: {
  open: boolean;
  onClose: () => void;
  carId: string;
  carName: string;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(data: FormValues) {
    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, carId, amount: 50000 }),
      });
      if (!res.ok) throw new Error();
      toast.success("Vehicle reserved!", { description: "Our team will contact you to complete the process." });
      reset();
      onClose();
    } catch {
      toast.error("Something went wrong", { description: "Please try again or call us directly." });
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reserve This Vehicle</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground -mt-2">{carName}</p>

        <div className="flex items-start gap-3 rounded-xl bg-primary/5 border border-primary/20 p-4">
          <ShieldCheck className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            A refundable reservation deposit of <span className="font-semibold text-foreground">{formatPKR(50000)}</span> holds
            this vehicle for 48 hours while you complete the purchase.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="r-name">Full Name</Label>
            <Input id="r-name" {...register("name")} placeholder="Ahmed Khan" />
            {errors.name && <p className="text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-phone">Phone Number</Label>
            <Input id="r-phone" {...register("phone")} placeholder="03XX-XXXXXXX" />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="r-email">Email (optional)</Label>
            <Input id="r-email" type="email" {...register("email")} placeholder="you@example.com" />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
              {isSubmitting ? "Processing..." : "Reserve Now"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
